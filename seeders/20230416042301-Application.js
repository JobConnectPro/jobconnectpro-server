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
    await queryInterface.bulkInsert('Applications', [
      {
        user_id: 3,
        job_id: 1,
        status: 'Application being reviewed',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        job_id: 2,
        status: 'Application being reviewed',
        description: null,
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
    await queryInterface.bulkDelete('Applications', null, {});
  },
};
