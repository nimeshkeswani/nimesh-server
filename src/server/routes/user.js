const router = require('express').Router()
const user = require('../controllers/user')

router.post('/', user.create)
router.patch('/:id', user.update)
router.post('/:id/changePassword', user.updatePassword)

module.exports = router
