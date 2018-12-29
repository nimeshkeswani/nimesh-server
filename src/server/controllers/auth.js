const AuthService = require('../services/auth')
const UserService = require('../services/user')

// Signup
exports.signup = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body)
    const token = await AuthService.generateAuthToken(user)
    return res.header('x-auth-token', token).status(200).send(user)
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    // Validate the data
    const { error } = await AuthService.validate(req.body)
    if (error) throw new Error(error.details[0].message)

    // Check if User exists
    const user = await UserService.findByEmail(req.body.email)
    if (!user) throw new Error('Invalid email or password')

    // Check if Password is valid
    const isPasswordValid = await UserService.isPasswordValid(user.id, req.body.password)
    if (!isPasswordValid) throw new Error('Invalid email or password')

    // Generate JWT Token
    const token = await AuthService.generateAuthToken(user)

    return res.status(200).send({ token })
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}
