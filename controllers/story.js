const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/api/story", (req, res) => {
  const sql = "SELECT * FROM team order by id";
  db.query(sql).then((dbRes) => {
    res.json(dbRes.rows);
  });
});

module.exports = router;