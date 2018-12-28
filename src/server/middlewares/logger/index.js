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
    })
  ]
})

module.exports = logger
