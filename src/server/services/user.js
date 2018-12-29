const { User } = require('../models')
const bcrypt = require('bcrypt')

class UserService {
  constructor () {
    this.attributes = ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt']
  }

  async getUsers () {
    const users = await User.findAll({ attributes: this.attributes })
    return users
  }

  async getUser (id) {
    const user = await User.findById(id, { attributes: this.attributes })
    if (!user) throw new Error('User does not exist')
    return user
  }

  async createUser (data) {
    // Validate the data
    const { error } = await User.joiValidate(data)
    if (error) throw new Error(error.details[0].message)

    // Check if User exists
    let user = await User.findOne({ where: { email: data.email } })
    if (user) throw new Error('User already exists')

    // Create the User
    user = await User.create(data, {
      fields: ['email', 'password', 'firstName', 'lastName']
    })

    user = await this.getUser(user.id)

    return user
  }

  async updateUser (id, data) {
    // Validate the data
    const { error } = await User.joiValidate(data, {
      firstName: { required: false },
      lastName: { required: false },
      password: { required: false }
    })
    if (error) throw new Error(error.details[0].message)

    // Check if User exists
    let user = await this.getUser(id)

    // Update the User
    await User.update(data, {
      where: {
        id
      },
      fields: ['firstName', 'lastName', 'password']
    })

    user = await this.getUser(id)

    return user
  }

  async deleteUser (id) {
    // Check if User exists
    await this.getUser(id)

    await User.destroy({
      where: {
        id
      }
    })
  }

  async findByEmail (email) {
    return await User.findOne({ where: { email } })
  }

  async isPasswordValid (id, password) {
    const user = await User.findById(id)
    return await bcrypt.compare(password, user.password)
  }
}

module.exports = new UserService()
