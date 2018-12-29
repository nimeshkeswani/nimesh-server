const AuthService = require('../services/auth')

// Login
exports.login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body)
    return res.status(200).send({ token })
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}
