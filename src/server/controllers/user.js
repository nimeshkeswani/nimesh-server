const UserService = require('../services/user')

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers()
    return res.status(200).send(users)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

// Create a User
exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const user = await UserService.createUser(email, password, firstName, lastName)
    return res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

// Get a User
exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUser(req.params.id)
    return res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

// Update a User
exports.updateUser = async (req, res) => {
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
exports.updateUserPassword = async (req, res) => {
  try {
    const id = req.params.id
    const { password } = req.body
    const user = await UserService.updateUserPassword(id, password)
    return res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

