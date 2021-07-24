// This is the database configuration file. Used to access the database.
// This file must be configured when deployed
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password123",
  host: "localhost",
  port: 5432,
  database: "lifehack",
});

module.exports = pool;
