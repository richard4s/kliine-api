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
      id: 1,
      name: 'youngin',
      frequency: 0,
      clothes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'standard',
      frequency: 2,
      clothes: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'kliine',
      frequency: 1,
      clothes: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      name: 'kliinePlus',
      frequency: 1,
      clothes: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 5,
      name: 'customWeekly',
      frequency: 1,
      clothes: 70,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 6,
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
