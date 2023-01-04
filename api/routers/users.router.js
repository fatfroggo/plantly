const usersRouter = require("express").Router();
const {
  getUsers,
  postUser,
  getUsersByUsername,
  patchUser,
  getUsersByEmail,
} = require("../controllers/users.controllers");

usersRouter.get("/", getUsers);

usersRouter.get("/:username", getUsersByUsername)

usersRouter.get("/user/:email", getUsersByEmail);

usersRouter.post("/", postUser)

usersRouter.patch("/:username", patchUser)

module.exports = usersRouter;
