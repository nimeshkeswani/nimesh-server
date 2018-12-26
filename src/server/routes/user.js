const router = require('express').Router()
const user = require('../controllers/user')

router.get('/', user.getUsers)
router.post('/', user.createUser)
router.get('/:id', user.getUser)
router.patch('/:id', user.updateUser)
router.post('/:id/changePassword', user.updateUserPassword)

module.exports = router
