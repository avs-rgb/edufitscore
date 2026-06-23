const backend = process.env.DATABASE_URL ? 'postgres' : 'sqlite';
console.log(`Using ${backend} database backend`);

module.exports = backend === 'postgres'
  ? require('./auth-db-postgres')
  : require('./auth-db-sqlite');
