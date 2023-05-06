'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Categories', [
      {
        category: 'General Services',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Supply Chain',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'IT and Software',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Customer Service',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Accounting and Finance',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
