const express = require("express");
const db = require("./database/db");
const itemsController = require("./controllers/items");
const { expressSession, pgSession } = require("./session");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client"));
app.use(express.json());

app.use("/", itemsController);

app.use(
  expressSession({
    store: new pgSession({
      pool: db, // Connects to our postgres db
      createTableIfMissing: true, // Creates a session table in your database (go look at it!)
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  })
);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
