const {
  selectUsers,
  addUser,
  selectUserByUsername,
  updateUser,
} = require("../models/users.models");

const bcrypt = require("bcrypt");

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

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  const toBeHashed = req.body.password;

  if (Object.keys(req.body).length < 4) {
    addUser(newUser,toBeHashed)
      .then((user) => {
        res.status(201).send({ user });
      })
      .catch(next);
  } else {
    async function createHashedPassword(hashable) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(hashable, salt);
    }
    createHashedPassword(toBeHashed).then((hashedPassword) => {
      addUser(newUser, hashedPassword)
        .then((user) => {
          res.status(201).send({ user });
        })
        .catch(next);
    });
  }
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
