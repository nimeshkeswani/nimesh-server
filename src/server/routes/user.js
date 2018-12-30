const router = require('express').Router()
const user = require('../controllers/user')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

router.get('/', [auth, admin], user.getUsers)
router.post('/', [auth, admin], user.createUser)
router.get('/me', auth, user.getMe)
router.get('/:id', [auth, admin], user.getUser)
router.patch('/:id', [auth, admin], user.updateUser)
router.delete('/:id', [auth, admin], user.deleteUser)

module.exports = router
