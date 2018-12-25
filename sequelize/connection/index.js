const Sequelize = require('sequelize')

// Sequelize connection
const sequelize = new Sequelize('postgres', 'nimesh', 'nimesh', {
  host: 'postgres',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// Test Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Sequilize connection to postgres has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to establish Sequilize connection to the postgres:', err)
  })

module.exports = sequelize
