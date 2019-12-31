'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlanType = sequelize.define('PlanType', {
    name: DataTypes.STRING
  }, {});
  PlanType.associate = function(models) {
    // associations can be defined here
  };
  return PlanType;
};