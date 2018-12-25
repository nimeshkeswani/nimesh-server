'use strict'
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      set: function (val) {
        this.setDataValue('password', this.generateHash(val))
      }
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
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    instanceMethods: {
      generateHash: password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
  })
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
