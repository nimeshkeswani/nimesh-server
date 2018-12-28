'use strict'
const bcrypt = require('bcrypt')
const Joi = require('joi')
const _ = require('lodash')

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

  return User
}
