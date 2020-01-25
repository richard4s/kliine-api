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
    //Also Known as Meal Types
    recipe: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
  });
  Meals.associate = function(models) {
    // associations can be defined here
    Meals.hasMany(models.MealType)
  };
  return Meals;
};