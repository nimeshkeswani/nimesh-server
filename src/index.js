const express = require('express')
const { sequelize } = require('./sequelize/models/index')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express()
app.get('/', (req, res) => {
  res.send('Hello world\n')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

// Test Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Sequilize connection to postgres has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to establish Sequilize connection to the postgres:', err)
  })