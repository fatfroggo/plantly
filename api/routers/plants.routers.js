const plantsRouter = require("express").Router();
const {
  getPlants,
  getPlantsById,
} = require("../controllers/plants.controllers");

plantsRouter.get("/", getPlants);

plantsRouter.get("/:plant_id", getPlantsById);

module.exports = plantsRouter;
