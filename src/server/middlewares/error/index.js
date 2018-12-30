const logger = require('../../startup/logger')

const error = (err, req, res, next) => {
  logger.error(err.message, err)
  res.status(500).send({ error: 'Something went wrong.' })
}

module.exports = error
