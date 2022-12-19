const plantsRouter = require('express').Router()
const {getPlants} = require('../controllers/plants.controllers')

plantsRouter.get('/',getPlants)


module.exports = plantsRouter