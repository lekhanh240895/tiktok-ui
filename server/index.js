const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routers/users");
const videos = require("./routers/videos");
const auth = require("./routers/auth");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// Connect to DB
const db = require("./config/db");
db.connect();

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
    litmit: "30mb",
  })
);
app.use(
  express.json({
    limit: "30mb",
  })
);

app.use(cors());

app.use("/users", users);
app.use("/videos", videos);
app.use("/auth", auth);

// Cookies
app.use(cookieParser());

app.get("/get-cookies", (req, res) => {
  // req.cookies
  res.json(req.cookies.username);
});

app.get("/set-cookies", (req, res) => {
  res.cookie("username", "lekhanh");
  res.cookie("newUser", true);

  res.send("You create cookies");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`);
});
