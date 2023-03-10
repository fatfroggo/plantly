const express = require("express")
const apiRouter = require('../api/routers/api.routers.js')
const app = express()

app.use(express.json())
app.use("/api", apiRouter)


app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  }
  else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err, "internal server error"); // this log acts as an error handler
  res.sendStatus(500);
});

module.exports = app;