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
    user: "postgres", // TODO: remove this
    database: "cake_shop",
    password: "3ff746c747d14f4a95548a8107d049a8", // TODO: remove this
  });
}

module.exports = db;
