'use strict'
const bcrypt = require('bcrypt')
const Joi = require('joi')
const _ = require('lodash')
const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    hooks: {
      afterValidate: async function (user) {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      beforeCreate: function (user, options) {
        user.createdAt = new Date()
        user.updatedAt = new Date()
      },
      beforeUpdate: function (user, options) {
        user.updatedAt = new Date()
      }
    }
  })

  // Class Methods
  User.associate = function (models) {
    // associations can be defined here
  }

  User.joiValidate = async (object, fields = {}) => {
    // Joi Schemas
    const joiFields = {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(20).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    }

    // Schema to Validate
    const fieldNames = _.keys(fields)
    let schema = {}
    if (fieldNames.length) {
      fieldNames.forEach(field => {
        fields[field].required
          ? schema[field] = joiFields[field]
          : schema[field] = joiFields[field].optional()
      })
    } else {
      schema = joiFields
    }

    return await Joi.validate(object, schema)
  }

  const attributes = ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt']

  User.getUsers = async () => {
    return await User.findAll({ attributes })
  }

  User.getUser = async (id) => {
    return await User.findById(id, { attributes })
  }

  User.createUser = async (data) => {
    // Create the User
    let user = await User.create(data, {
      fields: ['email', 'password', 'firstName', 'lastName']
    })

    user = await User.getUser(user.id)

    return user
  }

  User.findByEmail = async (email) => {
    return await User.findOne({ where: { email } })
  }

  User.prototype.updateUser = async function (data) {
    // Update the User
    await User.update(data, {
      where: {
        id: this.id
      },
      fields: ['firstName', 'lastName', 'password']
    })

    const user = await User.getUser(this.id)

    return user
  }

  User.prototype.deleteUser = async function () {
    await User.destroy({
      where: {
        id: this.id
      }
    })
  }

  User.prototype.generateAuthToken = async function () {
    return jwt.sign({ id: this.id, email: this.email }, config.jwtPrivateKey)
  }

  User.prototype.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  return User
}
