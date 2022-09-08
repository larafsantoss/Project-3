const express = require("express");
const db = require("./database/db");
const itemsController = require("./controllers/items");
const storyController = require("./controllers/story");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client"));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`I am getting a request with method: ${req.method} and route: ${req.path} at ${new Date()}`);
  next();
});

app.use("/", itemsController);
app.use("/", storyController);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
