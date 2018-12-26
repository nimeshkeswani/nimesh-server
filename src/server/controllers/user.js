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

// Update a User
exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const { firstName, lastName } = req.body
    const user = await UserService.updateUser(id, firstName, lastName)
    return res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

// Update a User Password
exports.updatePassword = async (req, res) => {
  try {
    const id = req.params.id
    const { password } = req.body
    const user = await UserService.updateUserPassword(id, password)
    return res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

