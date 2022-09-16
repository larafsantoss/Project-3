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

router.get("/api/orders/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT
      products.id AS product_id,
      products.name AS product_name,
      order_details.unit_price_in_cents,
      order_details.quantity,
      orders.customer_name,
      orders.customer_address,
      orders.total_amount
    FROM
      products
    INNER JOIN order_details ON
      order_details.product_id=products.id
    INNER JOIN orders ON 
      order_details.order_id=orders.id
    WHERE
    order_details.order_id=$1`;
  db.query(sql, [id]).then((dbRes) => {
    res.json(dbRes.rows);
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
    .then(async (dbRes) => {
      const orderId = dbRes.rows[0].id;

      for (const orderDetail of orderDetails) {
        const sql =
          "INSERT INTO order_details(order_id, product_id, quantity, unit_price_in_cents) VALUES($1, $2, $3, $4)";
        await db.query(sql, [
          orderId,
          orderDetail.itemId,
          orderDetail.quantity,
          orderDetail.unitPriceInCents,
        ]);
      }

      res.json({ orderId });
    })
    .catch((err) => {
      res.status(500).json({});
    });
});

module.exports = router;
