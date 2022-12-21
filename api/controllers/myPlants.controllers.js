const { selectMyPlants, addMyPlants} = require("../models/myPlants.models");
const { selectUserByUsername } = require("../models/users.models");
const { selectPlantsById} = require("../models/plants.models")
exports.getMyPlants = (req, res, next) => {
  const { username } = req.params;

  selectUserByUsername(username)
    .then(() => {
      return selectMyPlants(username);
    })
    .then((myPlants) => {
      res.status(200).send({ myPlants });
    })
    .catch(next);
};

exports.postMyPlants = (req, res, next) => {
  const { username, plant_id } = req.params;
  const { last_watered } = req.body;
    
  selectUserByUsername(username)
    .then(() => {
      return selectPlantsById(plant_id);
    })
    .then(() => {
      return addMyPlants(username, plant_id, last_watered);
    })
    .then((myPlant) => {
      res.status(201).send({ myPlant });
    })
    .catch(next);
};
