const { User } = require('../models')

class UserService {
  async createUser (email, password, firstName, lastName) {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    })
    return user
  }
}

module.exports = new UserService()
