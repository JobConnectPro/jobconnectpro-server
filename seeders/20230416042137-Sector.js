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
    await queryInterface.bulkInsert('Sectors', [
      {
        sector: 'Information Technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sector: 'Financial Services',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sector: 'Non-Profit / Volunteering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sector: 'Printing and Packaging',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sector: 'Veterinary',
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
    await queryInterface.bulkDelete('Sectors', null, {});
  },
};
