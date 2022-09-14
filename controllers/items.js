const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/api/items", (req, res) => {
  const { ids } = req.query;
  const sql =
    ids && ids.length > 0
      ? `SELECT * FROM products WHERE id IN(${ids.join(",")}) order by id`
      : "SELECT * FROM products order by id";

  db.query(sql).then((dbRes) => {
    res.json(dbRes.rows);
  });
});

router.get("/api/items/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM products WHERE id=$1";
  db.query(sql, [id]).then((dbRes) =>
    res.json(dbRes.rows.length === 0 ? {} : dbRes.rows[0])
  );
});

router.post("/api/items", (req, res) => {
  const { name, price_in_cents, image_url } = req.body;

  if (name === "" || price_in_cents === "" || image_url === "") {
    return res.status(400).json({ message: "Please fill in the entire form." });
  }

  const sql = `
  INSERT INTO products(name, price_in_cents, image_url) 
  VALUES($1, $2, $3)
`;
  db.query(sql, [name, price_in_cents, image_url])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({});
    });
});

router.put("/api/items/:id", (req, res) => {
  const id = req.params.id;

  const { name, price_in_cents, image_url } = req.body;
  console.log(req.body);

  if (name === "" || price_in_cents === "" || image_url === "") {
    return res.status(400).json({ message: "Please fill in the entire form." });
  }

  const sql = `
  UPDATE products SET name=$1, price_in_cents=$2, image_url=$3 WHERE id=$4
  `;

  db.query(sql, [name, price_in_cents, image_url, id])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.delete("/api/items/:id", (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM products WHERE id=$1";
  db.query(query, [id]).then((dbRes) => {
    if (dbRes.rows.length !== 1) {
      return res.status(404).json({ message: "Item not found!" });
    }

    const sql = `
    DELETE FROM products WHERE id=$1
    `;
    db.query(sql, [id])
      .then(() => {
        res.json(dbRes.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({});
      });
  });
});

module.exports = router;
