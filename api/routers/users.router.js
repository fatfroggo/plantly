const usersRouter = require("express").Router();
const {
  getUsers, postUser, getUsersByUsername, patchUser
} = require("../controllers/users.controllers");

usersRouter.get("/", getUsers);

usersRouter.get("/:username", getUsersByUsername)

usersRouter.post("/", postUser)

usersRouter.patch("/:username", patchUser)

module.exports = usersRouter;
