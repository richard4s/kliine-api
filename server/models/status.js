'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
  },

});


  Status.associate = function(models) {
    // associations can be defined here
    Status.belongsTo(models.Users);
  };

  return Status;
};