const myPlantsRouter = require("express").Router();
const {
  getMyPlants,
} = require("../controllers/myPlants.controllers");

myPlantsRouter.get("/:username", getMyPlants);

module.exports = myPlantsRouter;
