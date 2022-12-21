const { selectUsers, addUser } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({users})
    })
    .catch(next)
}


exports.postUser = (req, res, next) => {
  const newUser = req.body;
  console.log(newUser)
  addUser(newUser)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};