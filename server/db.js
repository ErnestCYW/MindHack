// this is a module which helps organize code into manageable parts.
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password123",
  host: "localhost",
  port: 5432,
  database: "lifehack",
});

module.exports = pool;
