const { selectMyPlants } = require("../models/myPlants.models");
const { selectUserByUsername } = require("../models/users.models");

exports.getMyPlants = (req, res, next) => {
    const { username } = req.params;

    selectUserByUsername(username).then(() => {
        return selectMyPlants(username);
    })
    .then((myPlants) => {
        res.status(200).send({myPlants})
    })
    .catch(next)
}