const apiRouter = require('express').Router()
const { getJSON } = require('../controllers/api.controllers.js')
const myPlantsRouter = require('./myPlants.routers.js')
const plantsRouter = require('./plants.routers.js')
const redditRouter = require('./reddit.routers.js')
const usersRouter = require('./users.router.js')


apiRouter.use('/plants', plantsRouter)

apiRouter.use('/users', usersRouter)

apiRouter.use('/myPlants', myPlantsRouter)

apiRouter.use("/reddit", redditRouter);

apiRouter.use("/", getJSON)

module.exports = apiRouter