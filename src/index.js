const express = require('express')
const app = express() // App
require('express-async-errors') // Monkey patch all routes handlers
require('./server/routes')(app) // Load all routes
require('./server/startup/db')() // Check if database is available
const config = require('config')
const logger = require('./server/middlewares/logger')

// Constants
const HOST = config.server.host
const PORT = config.server.port

app.listen(PORT, HOST)
logger.debug(`Running on http://${HOST}:${PORT}`)

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
