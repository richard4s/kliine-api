'use strict';
module.exports = (sequelize, DataTypes) => {
  const Laundry = sequelize.define('Laundry', {
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
  });
  Laundry.associate = function(models) {
    // associations can be defined here
  };
  return Laundry;
};