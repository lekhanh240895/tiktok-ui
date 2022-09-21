const express = require("express");
const app = express();
const port = 3004;
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routers/users");
const videos = require("./routers/videos");
const path = require("path");

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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
