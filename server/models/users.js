'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    emailVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    resetToken: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Status',
        key: 'id',
        as: 'statusID',
      },
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  });

  Users.associate = function(models) {
    // associations can be defined here
    
    // Users.hasMany(models.Statuses, {
    //     foreignKey: 'status',
    //     key: 'id',
    //     onDelete: 'CASCADE',
    // });

    Users.hasMany(models.Status)
  };

  return Users;
};