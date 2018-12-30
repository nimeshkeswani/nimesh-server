const Joi = require('joi')

class AuthService {

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
