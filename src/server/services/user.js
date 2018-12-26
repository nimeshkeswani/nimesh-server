const { User } = require('../models')

class UserService {

  async getUsers () {
    const users = await User.findAll()
    return users
  }

  async createUser (data) {
    const user = await User.create(data, {
      fields: ['email', 'password', 'firstName', 'lastName']
    })
    return user
  }

  async getUser (id) {
    const user = await User.findById(id)
    return user
  }

  async updateUser (id, data) {
    const user = await User.update(data, {
      where: {
        id
      },
      fields: ['firstName', 'lastName'],
      returning: true
    })
    return user[1][0]
  }

  async updateUserPassword (id, data) {
    const user = await User.update(data, {
      where: {
        id
      },
      fields: ['password'],
      returning: true
    })
    return user[1][0]
  }
}

module.exports = new UserService()
