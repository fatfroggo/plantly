const express = require("express")

const app = express()



app.use((err, req, res, next) => {
  console.log(err, "internal server error"); // this log acts as an error handler
  res.sendStatus(500);
});

module.exports = app;