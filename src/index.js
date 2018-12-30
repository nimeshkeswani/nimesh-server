const express = require('express')
const app = express() // App
const logger = require('./server/startup/logger')
require('./server/routes')(app) // Load all routes
require('./server/startup/db')() // Check if database is available
const config = require('config')

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
