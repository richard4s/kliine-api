'use strict';
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
    bathroom: {
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
  };
  return PlanType;
};