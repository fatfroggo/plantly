const apiRouter = require('express').Router()
const myPlantsRouter = require('./myPlants.routers.js')
const plantsRouter = require('./plants.routers.js')
const usersRouter = require('./users.router.js')


apiRouter.use('/plants', plantsRouter)

apiRouter.use('/users', usersRouter)

apiRouter.use('/myPlants', myPlantsRouter)

module.exports = apiRouter