const jwt = require('jsonwebtoken')
const Joi = require('joi')
const config = require('config')

class AuthService {

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
