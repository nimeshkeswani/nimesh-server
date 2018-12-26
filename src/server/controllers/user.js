const UserService = require('../services/user')

// Create a User
exports.create = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const user = await UserService.createUser(email, password, firstName, lastName)
    return res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}
