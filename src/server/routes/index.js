const express = require('express')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const error = require('../middlewares/error')
const homeRouter = require('../routes/home')
const userRouter = require('../routes/user')
const authRouter = require('../routes/auth')
const logger = require('../middlewares/logger')

module.exports = (app) => {
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
}
