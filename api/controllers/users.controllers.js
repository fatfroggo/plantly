const {
  selectUsers,
  addUser,
  selectUserByUsername,
  updateUser,
  selectUserByEmail,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUsersByUsername = (req, res, next) => {
  const { username } = req.params;

  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getUsersByEmail = (req, res, next) => {
  const { email } = req.body;

  selectUserByEmail(email)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;

  addUser(newUser)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const newUsername = req.body;
  const { username } = req.params;
  updateUser(newUsername, username)
    .then((user) => {
      res.status(202).send({ user });
    })
    .catch(next);
};
