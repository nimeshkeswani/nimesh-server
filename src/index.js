const express = require('express')
const app = express() // App
require('express-async-errors')
require('./server/routes')(app)
const { sequelize } = require('./server/models/index')
const config = require('config')
const logger = require('./server/middlewares/logger')

// Constants
const HOST = config.server.host
const PORT = config.server.port

app.listen(PORT, HOST)
logger.debug(`Running on http://${HOST}:${PORT}`)

// Test Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    logger.debug('Sequilize connection to postgres has been established successfully.')
  })
  .catch(err => {
    logger.debug('Unable to establish Sequilize connection to the postgres:', err)
  })

// Check if JWT Private Key is defined
if (!config.jwtPrivateKey) {
  logger.error('Environment Variable JWT_PRIVATE_KEY is not defined')
  process.exit(1)
}

// Handle Uncaught Exceptions
process.on('uncaughtException', (ex) => {
  logger.error(ex.message, ex)
  process.exit(1)
})

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (ex) => {
  logger.error(ex.message, ex)
  process.exit(1)
})
