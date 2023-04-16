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
    await queryInterface.bulkInsert('Jobs', [
      {
        user_id: 1,
        company_id: 1,
        title: 'Fullstack Web Developer',
        description: 'Fullstack Web Developer',
        requirement: 'Fullstack Web Developer',
        job_level: 'Associate/Supervisor',
        minimum_salary: 5000000,
        maximum_salary: 10000000,
        type: 'Onsite',
        location: 'Jakarta',
        starting_date: '2020-01-01',
        minimum_experience: 2,
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
    await queryInterface.bulkDelete('Jobs', null, {});
  },
};
