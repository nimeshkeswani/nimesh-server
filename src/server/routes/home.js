const router = require('express').Router()

router.get('/', (req, res) => {
  return res.send('Hello world\n')
})

module.exports = router
