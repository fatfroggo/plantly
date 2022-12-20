const apiRouter = require('express').Router()
const plantsRouter = require('./plants.routers.js')
const usersRouter = require('./users.router.js')


apiRouter.use('/plants', plantsRouter)

apiRouter.use('/users', usersRouter)

module.exports = apiRouter