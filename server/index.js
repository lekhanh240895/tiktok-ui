const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const posts = require("./routers/posts");

// Connect to DB
const db = require("./config/db/index");
db.connect();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "30mb" }));

app.use(cors());

app.use("/posts", posts);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
