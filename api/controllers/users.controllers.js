const { selectUsers, addUser, selectUserByUsername } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({users})
    })
    .catch(next)
}

exports.getUsersByUsername = (req, res, next) => {
  const { username } = req.params;

  selectUserByUsername(username).then((user) => {
    res.status(200).send({ user })
  })
  .catch(next)
}

exports.postUser = (req, res, next) => {
  const newUser = req.body;

  addUser(newUser)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};