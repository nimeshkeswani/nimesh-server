const { sequelize } = require('../models')
const logger = require('../middlewares/logger')

module.exports = () => {
  // Test Sequelize connection
  sequelize
  .authenticate()
  .then(() => {
    logger.info('Sequilize connection to postgres has been established successfully.')
})
}