const pg = require("pg");

const db = new pg.Pool({
  database: "cake_shop",
});

module.exports = db;
