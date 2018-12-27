const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Hello world\n')
})

module.exports = router
