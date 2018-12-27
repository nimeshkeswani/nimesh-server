const express = require('express')
const { sequelize } = require('./server/models/index')
const userRouter = require('./server/routes/user')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')

// Constants
const HOST = config.server.host
const PORT = config.server.port

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

// Middlewares
app.use(helmet()) // middleare to set secure HTTP headers
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny')) // logger middleware
app.use(bodyParser.json()) // middleware to parse request body
app.use(express.static(path.join(__dirname, '/public')))

// Routes
app.use('/api/users', userRouter)
