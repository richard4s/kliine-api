'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('MealTypes', [{
        id: 1,
        name: 'Meats & Veggies',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        name: 'Veggies',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        name: 'Low Calories',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        name: 'Family Friendly',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        name: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('MealTypes', null, {});
  }
};
