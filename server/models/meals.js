'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meals = sequelize.define('Meals', {
    //Takes Plan Name for Custom Plans
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    //Calibrated Weekly i.e. if frequency = 1, then once weekly
    frequency: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    people: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    //Also Known as Meal Types
    recipe: {
      allowNull: true,
      unique: true,
      type: DataTypes.INTEGER
    },
  });
  Meals.associate = function(models) {
    // associations can be defined here
    // Meals.hasMany(models.MealType)
    Meals.belongsTo(models.MealType, {
      foreignKey: 'id',
      as: 'mealTypesPlanType',
    });
  };
  return Meals;
};