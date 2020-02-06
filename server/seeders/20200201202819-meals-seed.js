'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Meals', [{
        id: 1,
        name: 'youngin',
        frequency: 0,
        people: 0,
        recipe: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        name: 'standard',
        frequency: 0,
        people: 0,
        recipe: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        name: 'kliine',
        frequency: 0,
        people: 0,
        recipe: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        name: 'kliinePlus',
        frequency: 1,
        people: 2,
        recipe: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        //Create multiple rows based on each iteration
        id: 5,
        name: 'custom',
        frequency: 1,
        people: 1,
        recipe: 5,
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
   return queryInterface.bulkDelete('Meals', null, {});
  }
};
