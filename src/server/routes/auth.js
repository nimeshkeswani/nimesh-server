const router = require('express').Router()
const auth = require('../controllers/auth')

router.post('/', auth.login)

module.exports = router
