const redditRouter = require("express").Router();
const {
  getReddit,

} = require("../controllers/reddit.controllers");
redditRouter.get("/", getReddit);



module.exports = redditRouter;
