const assert = require('assert');
const { spawn } = require('child_process');

const port = 3999;
const baseUrl = `http://127.0.0.1:${port}`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      lastError = error;
      await wait(250);
    }
  }
  throw lastError;
}

async function main() {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(port), DATABASE_PATH: process.env.DATABASE_PATH || ':memory:' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stderr = '';
  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

  try {
    const home = await fetchWithRetry(`${baseUrl}/`);
    assert.strictEqual(home.status, 200);
    const csp = home.headers.get('content-security-policy') || '';
    assert(csp.includes("script-src 'self'"), 'CSP should restrict scripts to self');
    assert(!csp.includes('require-trusted-types-for'), 'CSP must not enforce Trusted Types yet');
    const html = await home.text();
    assert(html.includes('/app.js'), 'home page should load app.js');

    const appJs = await fetchWithRetry(`${baseUrl}/app.js`);
    assert.strictEqual(appJs.status, 200);
    const appText = await appJs.text();
    assert(appText.includes('addEventListener'), 'app.js should contain event listener wiring');

    const accessSettings = await fetchWithRetry(`${baseUrl}/api/admin/access-settings`);
    assert.strictEqual(accessSettings.status, 401, 'admin access settings should require authentication');

    console.log('runtime smoke tests passed');
  } finally {
    child.kill();
    if (stderr && !child.killed) {
      process.stderr.write(stderr);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
