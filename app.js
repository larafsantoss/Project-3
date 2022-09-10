const express = require("express");
const db = require("./database/db");
const itemsController = require("./controllers/items");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client"));
app.use(express.json());

app.use("/", itemsController);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

// This is git hub test
