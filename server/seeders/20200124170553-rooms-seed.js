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
   return queryInterface.bulkInsert('Rooms', [{
    name: 'youngin',
    frequency: 1,
    rooms: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'standard',
    frequency: 1,
    rooms: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'kliine',
    frequency: 1,
    rooms: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'kliinePlus',
    frequency: 1,
    rooms: 3,
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
   return queryInterface.bulkDelete('Rooms', null, {});
  }
};
