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

router.get("/api/items/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM orders WHERE id=$1";
  db.query(sql, [id]).then((dbRes) => {
    res.json(dbRes.rows.length === 0 ? {} : dbRes.rows[0]);
  });
});

router.post("/api/orders", (req, res) => {
  const { customerName, customerAddress, totalAmount, orderDetails } = req.body;

  if (customerName === "" || customerAddress === "") {
    return res.status(400).join({ message: "Please fill in the entire form" });
  }

  const sql =
    "INSERT INTO orders(customer_name, customer_address, total_amount) VALUES($1, $2, $3) RETURNING id";
  db.query(sql, [customerName, customerAddress, totalAmount])
    .then((dbRes) => {
      const orderId = dbRes.rows[0].id;
      const sql =
        "INSERT INTO order_details(order_id, product_id, quantity, unit_price_in_cents) VALUES($1, $2, $3)";
      db.query(sql, [
        orderId,
        orderDetails.itemId,
        orderDetails.quantity,
        orderDetails.unitPriceInCents,
      ]).then((dbRes) => {
        res.json({ orderId });
      });
    })
    .catch((err) => {
      res.status(500).json({});
    });
});

module.exports = router;
