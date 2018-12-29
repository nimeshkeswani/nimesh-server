const jwt = require('jsonwebtoken')
const Joi = require('joi')
const UserService = require('../services/user')
const config = require('config')

class AuthService {

  async login (data) {
    // Validate the data
    const { error } = await this.validate(data)
    if (error) throw new Error(error.details[0].message)

    // Check if User exists
    const user = await UserService.findByEmail(data.email)
    if (!user) throw new Error('Invalid email or password')

    // Check if Password is valid
    const isPasswordValid = await UserService.isPasswordValid(user.id, data.password)
    if (!isPasswordValid) throw new Error('Invalid email or password')

    // Generate JWT Token
    const token = this.generateAuthToken(user)

    return token
  }

  async generateAuthToken (user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtPrivateKey)
  }

  async validate (object) {
    // Joi Schema
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(20).required()
    }

    return await Joi.validate(object, schema)
  }
}

module.exports = new AuthService()
