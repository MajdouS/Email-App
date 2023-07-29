const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send({ Hi: "World" });
});
app.listen(3000);
