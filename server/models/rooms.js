'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
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
    rooms: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Rooms.associate = function(models) {
    // associations can be defined here
    // Rooms.belongTo(models.PlanType)
  };
  return Rooms;
};