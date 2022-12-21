const myPlantsRouter = require("express").Router();
const {
  getMyPlants,
  postMyPlants,
  deleteMyPlant
} = require("../controllers/myPlants.controllers");

myPlantsRouter.get("/:username", getMyPlants);

myPlantsRouter.post("/:username/:plant_id", postMyPlants);

myPlantsRouter.delete("/:username/:my_plant_id", deleteMyPlant);
module.exports = myPlantsRouter;
