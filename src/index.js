const express = require('express')
const app = express() // App
const logger = require('./server/startup/logger')
require('./server/routes')(app) // Load all routes
require('./server/startup/db')() // Check if database is available
require('./server/startup/config')() // Check if necessary configuration is set
const config = require('config')

// Constants
const HOST = config.server.host
const PORT = config.server.port

app.listen(PORT, HOST)
logger.info(`Running on http://${HOST}:${PORT}`)
