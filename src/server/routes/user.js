const router = require('express').Router()
const user = require('../controllers/user')
const auth = require('../middlewares/auth')

router.get('/', auth, user.getUsers)
router.post('/', auth, user.createUser)
router.get('/me', auth, user.getMe)
router.get('/:id', auth, user.getUser)
router.patch('/:id', auth, user.updateUser)
router.delete('/:id', auth, user.deleteUser)

module.exports = router
