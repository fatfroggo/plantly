const myPlantsRouter = require("express").Router();
const {
  getMyPlants,
  postMyPlants
} = require("../controllers/myPlants.controllers");

myPlantsRouter.get("/:username", getMyPlants);

myPlantsRouter.post("/:username/:plant_id", postMyPlants);

module.exports = myPlantsRouter;
