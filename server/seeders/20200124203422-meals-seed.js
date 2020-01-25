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
      return queryInterface.bulkInsert('Meals', [{
        name: 'youngin',
        frequency: 0,
        people: 0,
        recipe: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'standard',
        frequency: 0,
        people: 0,
        recipe: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'kliine',
        frequency: 0,
        people: 0,
        recipe: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'kliinePlus',
        frequency: 1,
        people: 2,
        recipe: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        //Create multiple rows based on each iteration
        name: 'custom',
        frequency: 1,
        people: 1,
        recipe: 1,
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
