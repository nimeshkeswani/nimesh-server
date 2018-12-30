const { User } = require('../models')

// Get Users
exports.getUsers = async (req, res) => {
  const users = await User.getUsers()
  return res.status(200).send(users)
}

// Create a User
exports.createUser = async (req, res) => {
  // Validate the data
  const { error } = await User.joiValidate(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })

  // Check if User exists
  let user = await User.findByEmail(req.body.email)
  if (user) return res.status(400).send({ error: 'User already axists' })

  user = await User.createUser(req.body)
  return res.status(200).send(user)
}

// Get a User
exports.getUser = async (req, res) => {
  // Check if User exists
  const user = await User.getUser(req.params.id)
  if (!user) return res.status(400).send({ error: 'User does not exist' })

  return res.status(200).send(user)
}

// Get Me
exports.getMe = async (req, res) => {
  // Check if User exists
  const user = await User.getUser(req.user.id)
  if (!user) return res.status(400).send({ error: 'User does not exist' })

  return res.status(200).send(user)
}

// Update a User
exports.updateUser = async (req, res) => {
  // Validate the data
  const { error } = await User.joiValidate(req.body, {
    firstName: { required: false },
    lastName: { required: false },
    password: { required: false }
  })
  if (error) return res.status(400).send({ error: error.details[0].message })

  // Check if User exists
  let user = await User.getUser(req.params.id)
  if (!user) return res.status(400).send({ error: 'User does not exist' })

  user = await user.updateUser(req.body)
  return res.status(200).send(user)
}

// Delete a User
exports.deleteUser = async (req, res) => {
  // Check if User exists
  const user = await User.getUser(req.params.id)
  if (!user) return res.status(400).send({ error: 'User does not exist' })

  await user.deleteUser()
  return res.status(200).send()
}
