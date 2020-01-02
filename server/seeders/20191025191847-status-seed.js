'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Statuses', [{
        name: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'paused',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'disabled',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'suspended',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'verified',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'unverified',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Statuses', null, {});
    
  }
};
