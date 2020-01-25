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
    return queryInterface.bulkInsert('Laundries', [{
      name: 'youngin',
      frequency: 0,
      clothes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'standard',
      frequency: 2,
      clothes: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'kliine',
      frequency: 1,
      clothes: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'kliinePlus',
      frequency: 1,
      clothes: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'customWeekly',
      frequency: 1,
      clothes: 70,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'customTwiceWeekly',
      frequency: 2,
      clothes: 70,
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
   return queryInterface.bulkDelete('Laundries', null, {});
  }
};
