const myPlantsRouter = require("express").Router();
const {
  getMyPlants,
  postMyPlants,
  deleteMyPlant,
  patchMyPlants,
  getMyPlantsById,
  patchMyPlantsLastWatered,
} = require("../controllers/myPlants.controllers");


myPlantsRouter.get("/:username", getMyPlants);

myPlantsRouter.get("/:username/:my_plant_id", getMyPlantsById)

myPlantsRouter.post("/:username/:plant_id", postMyPlants);

myPlantsRouter.delete("/:username/:my_plant_id", deleteMyPlant);

myPlantsRouter.patch("/:username/:my_plant_id", patchMyPlants)

myPlantsRouter.patch("/:username/:my_plant_id/last_watered", patchMyPlantsLastWatered);

module.exports = myPlantsRouter;
