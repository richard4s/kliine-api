'use strict';

const Rooms = require('../models').Rooms;
const Laundries = require('../models').Laundries;
const Meals = require('../models').Meals;

module.exports = (sequelize, DataTypes) => {
  const PlanType = sequelize.define('PlanType', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rooms: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    laundry: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    meals: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    //Duration of Plan itself, usually +30 days
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  });
  
  PlanType.associate = function(models) {
    // associations can be defined here
    // PlanType.hasMany(Rooms)
    // PlanType.hasMany(Laundries)
    // PlanType.hasMany(Meals)
  };
  return PlanType;
};