const express = require("express");
const db = require("./database/db");
const itemsController = require("./controllers/items");
const storyController = require("./controllers/story");

const app = express();
const port = 3000;

app.use(express.static("client"));
app.use(express.json());

app.use("/", itemsController);
app.use("/", storyController);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
