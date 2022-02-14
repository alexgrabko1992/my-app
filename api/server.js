const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () =>
  console.log(`Server listened on port: ${process.env.PORT}`)
);
