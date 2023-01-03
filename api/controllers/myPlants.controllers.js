const {
  selectMyPlants,
  addMyPlants,
  selectMyPlantsById,
  deleteSelectedPlant,
  updateMyPlant,
  updateMyPlantLastWatered,
} = require("../models/myPlants.models");
const { selectUserByUsername } = require("../models/users.models");
const { selectPlantsById } = require("../models/plants.models");

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
  const { last_watered_date, nickname } = req.body;

  selectUserByUsername(username)
    .then(() => {
      return selectPlantsById(plant_id);
    })
    .then(() => {
      return addMyPlants(username, plant_id, last_watered_date, nickname);
    })
    .then((myPlant) => {
      res.status(201).send({ myPlant });
    })
    .catch(next);
};


exports.deleteMyPlant = (req, res, next) => {
  const { username, my_plant_id } = req.params;
  selectUserByUsername(username)
    .then(() => {
      return selectMyPlantsById(my_plant_id);
    })
    .then(() => {
      return deleteSelectedPlant( my_plant_id);
    })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};

exports.patchMyPlantsLastWatered = (req, res, next) => {
  
  const { username, my_plant_id } = req.params;

  const last_watered_date = req.body;

  selectUserByUsername(username)
    .then(() => {
  
      return selectMyPlantsById(my_plant_id);
    })
    .then(() => {
         
      return updateMyPlantLastWatered(my_plant_id, username, last_watered_date);
    })
    .then((myPlant) => {
  
      res.status(202).send({ myPlant });
    })
    .catch(next);
};

exports.patchMyPlants = (req, res, next) => {
  const { username, my_plant_id } = req.params;
  const newNickname = req.body;

  selectUserByUsername(username)
    .then(() => {
      return selectMyPlantsById(my_plant_id);
    })
    .then(() => {
      return updateMyPlant(my_plant_id, username, newNickname);
    })
    .then((myPlant) => {
      res.status(202).send({ myPlant });
    })
    .catch(next);
};

exports.getMyPlantsById = (req, res, next) => {
  const { username, my_plant_id } = req.params
  selectUserByUsername(username)
  .then(() => {
    return selectMyPlantsById(my_plant_id);
  })
  .then((myPlant) => {
    res.status(200).send({myPlant})
  })
  .catch(next)
}
