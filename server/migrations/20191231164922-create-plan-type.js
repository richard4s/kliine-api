'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlanTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      rooms: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id',
          as: 'roomsId',
        },
      },
      laundry: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Laundries',
          key: 'id',
          as: 'laundryId',
        },
      },
      meals: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Meals',
          key: 'id',
          as: 'mealsId',
        },
      },
      //Subtract plan createdAt from duration
      //Integer calibrated in days
      duration: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlanTypes');
  }
};