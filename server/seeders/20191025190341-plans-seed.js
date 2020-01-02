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
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'standard',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'kliine',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'kliinePlus',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'custom',
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
