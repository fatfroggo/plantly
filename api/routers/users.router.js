const usersRouter = require("express").Router();
const {
  getUsers, postUser, getUsersByUsername
} = require("../controllers/users.controllers");

usersRouter.get("/", getUsers);

usersRouter.get("/:username", getUsersByUsername)

usersRouter.post("/", postUser)

module.exports = usersRouter;
