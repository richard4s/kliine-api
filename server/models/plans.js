'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plans = sequelize.define('Plans', {
    name: DataTypes.STRING
  }, {});
  Plans.associate = function(models) {
    // associations can be defined here
  };
  return Plans;
};