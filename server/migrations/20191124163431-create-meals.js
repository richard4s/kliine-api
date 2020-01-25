'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Meals', {
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
      //Calibrated Weekly i.e. if frequency = 1, then once weekly
      frequency: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      people: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      //How much recipe's per week
      recipe: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'MealTypes',
          key: 'id',
          as: 'mealTypesId',
        },
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
    return queryInterface.dropTable('Meals');
  }
};