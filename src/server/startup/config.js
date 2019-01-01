const config = require('config')
const logger = require('../startup/logger')

module.exports = () => {
  // Check if JWT Private Key is defined
  if (!config.jwtPrivateKey) {
    throw new Error('Environment Variable JWT_PRIVATE_KEY is not defined')
  }
}
