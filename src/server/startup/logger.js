require('express-async-errors') // Monkey patch all routes handlers
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize } = format

// Log Level
const level = process.env.LOG_LEVEL || 'debug'

// Logging Format
const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

// Logger
const logger = createLogger({
  format: combine(
    timestamp()
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        myFormat
      ),
      level: level
    }),
    new transports.File({
      format: combine(
        myFormat
      ),
      filename: 'logfile.log',
      level: level
    })
  ]
})

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

module.exports = logger
