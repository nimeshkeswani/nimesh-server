'use strict'
const bcrypt = require('bcrypt')

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
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 20]
      },
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
      afterValidate: function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
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
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
