const pg = require("pg");

// const db = new pg.Pool({
//   database: "cake_shop",
// });

let db;
if (process.env.NODE_ENV === "production") {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new pg.Pool({
    database: "cake_shop",
  });
}

module.exports = db;
