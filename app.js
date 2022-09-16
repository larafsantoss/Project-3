const express = require("express");
const db = require("./database/db");

const { expressSession, pgSession } = require("./session");

const itemsController = require("./controllers/items");
const usersController = require("./controllers/users");
const ordersController = require("./controllers/orders");
// const expressSession = require("express-session"); // Express library to handle sessions
// const pg = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client"));
app.use(express.json());

app.use(
  expressSession({
    store: new pgSession({
      pool: db, // Connects to our postgres db
      createTableIfMissing: true, // Creates a session table in your database (go look at it!)
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", itemsController);
app.use("/", ordersController);
app.use("/", usersController);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
