const AuthService = require('../services/auth')
const { User } = require('../models')

// Signup
exports.signup = async (req, res) => {
  try {
    // Validate the data
    const { error } = await User.joiValidate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    // Check if User exists
    let user = await User.findByEmail(req.body.email)
    if (user) return res.status(400).send({ error: 'User already axists' })

    user = await User.createUser(req.body)
    const token = await user.generateAuthToken()
    return res.header('x-auth-token', token).status(200).send(user)
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}

// Login
exports.login = async (req, res) => {
  // Validate the data
  const { error } = await AuthService.validate(req.body)
  if (error) throw new Error(error.details[0].message)

  // Check if User exists
  const user = await User.findByEmail(req.body.email)
  if (!user) throw new Error('Invalid email or password')

  // Check if Password is valid
  const isPasswordValid = await user.isPasswordValid(req.body.password)
  if (!isPasswordValid) throw new Error('Invalid email or password')

  // Generate JWT Token
  const token = await user.generateAuthToken()

  return res.status(200).send({ token })
}
