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

  async updateUser (id, firstName, lastName) {
    const user = await User.update({
      firstName,
      lastName
    }, {
      where: {
        id
      },
      returning: true
    })
    return user[1][0]
  }
}

module.exports = new UserService()
