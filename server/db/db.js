const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "portfolio",
  password: "hertheydotun",
  port: 7085, // your custom port
});

module.exports = pool;