const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/api/orders", (req, res) => {
  const sql = "SELECT * FROM orders order by id";
  db.query(sql).then((dbRes) => {
    // console.log(dbRes.rows);
    res.json(dbRes.rows);
  });
});

router.post("/api/orders", (req, res) => {
  const { customerName, customerAddress, totalAmount } = req.body;

  // console.log(req.body);

  if (customerName === "" || customerAddress === "") {
    return res.status(400).join({ message: "Please fill in the entire form" });
  }

  const sql =
    "INSERT INTO orders(customer_name, customer_address, total_amount) VALUES($1, $2, $3) RETURNING id";
  db.query(sql, [customerName, customerAddress, totalAmount])
    .then((dbRes) => {
      res.json({ orderId: dbRes.rows[0].id });
    })
    .catch((err) => {
      res.status(500).json({});
    });
});

module.exports = router;
