const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/api/items", (req, res) => {
  const sql = "SELECT * FROM products order by id";
  db.query(sql).then((dbRes) => {
    res.json(dbRes.rows);
  });
});

module.exports = router;
