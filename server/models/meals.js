'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meals = sequelize.define('Meals', {
    //Takes Plan Name for Custom Plans
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    //Calibrated Weekly i.e. if frequency = 1, then once weekly
    people: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipe: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  });
  Meals.associate = function(models) {
    // associations can be defined here
  };
  return Meals;
};