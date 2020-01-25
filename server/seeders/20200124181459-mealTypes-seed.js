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
        name: 'Meats & Veggies',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Veggies',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Low Calories',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Family Friendly',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
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
