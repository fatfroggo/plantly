const apiRouter = require('express').Router()
const plantsRouter = require('./plants.routers.js')


apiRouter.use('/plants', plantsRouter)

module.exports = apiRouter