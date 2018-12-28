const UserService = require('../services/user')

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers()
    return res.status(200).send(users)
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}

// Create a User
exports.createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body)
    return res.status(200).send(user)
  } catch (err) {
    return res.status(400).send({ error: err.message })
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
    const user = await UserService.updateUser(id, req.body)
    return res.status(200).send(user)
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}

// Delete a User
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await UserService.deleteUser(id)
    return res.status(200).send(user)
  } catch (err) {
    return res.status(400).send({ error: err.message })
  }
}
