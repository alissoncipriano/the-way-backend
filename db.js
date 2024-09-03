const pg = require('pg');
const pool = new pg.Pool({
  host: 'db',
  port: 5432,
  user: 'user',
  password: 'password',
  database: 'db1',
});

module.exports = pool;
