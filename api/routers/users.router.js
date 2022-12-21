const usersRouter = require("express").Router();
const {
  getUsers, postUser
} = require("../controllers/users.controllers");

usersRouter.get("/", getUsers);

usersRouter.post("/", postUser)

module.exports = usersRouter;
