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
    return queryInterface.bulkInsert('PlanTypes', [{
      name: 'youngin',
      price: 20000,
      rooms: 1,
      laundry: 1,
      meals: 1,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'standard',
      price: 27000,
      rooms: 2,
      laundry: 2,
      meals: 2,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'kliine',
      price: 40000,
      rooms: 3,
      laundry: 3,
      meals: 3,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'kliinePlus',
      price: 60000,
      rooms: 4,
      laundry: 4,
      meals: 4,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'custom',
      price: 70000,
      rooms: 4,
      laundry: 5,
      meals: 5,
      duration: 30,
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
    return queryInterface.bulkDelete('PlanTypes', null, {});
  }
};
