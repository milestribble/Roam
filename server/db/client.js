const pgp = require('pg-promise')();

const config = {
  database: process.env.NODE_ENV === 'test'
    ? 'roam_test'
    : 'roam',
  host: 'localhost',
  port: 5432,
};

const db = pgp(process.env.DATABASE_URL || config);

module.exports = {
  db,
};
