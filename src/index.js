require('express-async-errors')
const express = require('express')
const { sequelize } = require('./server/models/index')
const homeRouter = require('./server/routes/home')
const userRouter = require('./server/routes/user')
const authRouter = require('./server/routes/auth')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const logger = require('./server/middlewares/logger')
const error = require('./server/middlewares/error')

// Constants
const HOST = config.server.host
const PORT = config.server.port

// App
const app = express()

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

// Middlewares
app.use(helmet()) // middleare to set secure HTTP headers
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // HTTP logger middleware
  logger.debug('Morgan enabled...')
}
app.use(bodyParser.json()) // middleware to parse request body
app.use(express.static(path.join(__dirname, '/public')))

// Routes
app.use('/', homeRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

// Error Middleware
app.use(error)

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
