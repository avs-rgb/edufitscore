const net = require('net');
const tls = require('tls');

function smtpConfig() {
  return {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || process.env.SMTP_USER || '',
  };
}

function resendConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.MAIL_FROM || 'EduFitScore <info@edufitscore.co.il>',
  };
}

function encodeBase64(value) {
  return Buffer.from(String(value), 'utf8').toString('base64');
}

function sanitizeHeader(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

function readLine(socket) {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const onData = (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      if (!lines.length) {
        return;
      }
      const lastLine = lines[lines.length - 1];
      if (/^\d{3} /.test(lastLine)) {
        socket.off('data', onData);
        resolve(lines.join('\n'));
      }
    };
    socket.on('data', onData);
    socket.once('error', reject);
  });
}

async function command(socket, text, expectedCodes) {
  socket.write(`${text}\r\n`);
  const response = await readLine(socket);
  const code = Number(response.slice(0, 3));
  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP command failed with code ${code}`);
  }
  return response;
}

function connect(config) {
  return new Promise((resolve, reject) => {
    const socket = net.connect(config.port, config.host, () => resolve(socket));
    socket.once('error', reject);
  });
}

async function sendWithResend({ to, subject, text }) {
  const config = resendConfig();
  if (!config.apiKey) {
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend email failed with status ${response.status}`);
  }

  return true;
}

async function sendWithSmtp({ to, subject, text }) {
  const config = smtpConfig();
  if (!config.host || !config.user || !config.pass || !config.from) {
    console.warn('Email not sent because SMTP environment variables are missing.');
    return false;
  }

  let socket = await connect(config);
  await readLine(socket);
  await command(socket, `EHLO ${config.host}`, [250]);
  await command(socket, 'STARTTLS', [220]);
  socket = tls.connect({ socket, servername: config.host });
  await command(socket, `EHLO ${config.host}`, [250]);
  await command(socket, 'AUTH LOGIN', [334]);
  await command(socket, encodeBase64(config.user), [334]);
  await command(socket, encodeBase64(config.pass), [235]);
  await command(socket, `MAIL FROM:<${config.from}>`, [250]);
  await command(socket, `RCPT TO:<${to}>`, [250, 251]);
  await command(socket, 'DATA', [354]);

  const message = [
    `From: ${sanitizeHeader(config.from)}`,
    `To: ${sanitizeHeader(to)}`,
    `Subject: ${sanitizeHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    String(text || ''),
  ].join('\r\n');

  socket.write(`${message}\r\n.\r\n`);
  await readLine(socket);
  await command(socket, 'QUIT', [221]);
  return true;
}

async function sendMail(message) {
  if (await sendWithResend(message)) {
    return true;
  }

  return sendWithSmtp(message);
}

module.exports = { sendMail };
