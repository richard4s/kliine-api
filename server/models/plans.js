'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plans = sequelize.define('Plans',{
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onDelete: 'CASCADE',
      references: {
        model: 'Status',
        key: 'id',
        as: 'statusID',
      },
  }, 
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
  }, 
  types: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onDelete: 'CASCADE',
      references: {
        model: 'PlanType',
        key: 'id',
        as: 'PlanTypeId',
      },
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  expDate: {
    allowNull: false,
    type: DataTypes.DATE
  }
});

  Plans.associate = function(models) {
    // associations can be defined here
    // Plans.hasMany(models.Status)
    // Plans.hasMany(models.Users)
    // Plans.hasMany(models.PlanType)
  };
  return Plans;
};