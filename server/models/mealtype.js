'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealType = sequelize.define('MealType', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  });
  MealType.associate = function(models) {
    // associations can be defined here

    

  };
  return MealType;
};