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
    await queryInterface.bulkInsert('WorkExperiences', [
      {
        user_id: 3,
        job_title: 'Junior Backend Developer',
        company: 'PT Petrokimia Gresik',
        start_date: '2020-01-01',
        end_date: '2020-08-01',
        description: 'Develop Tender Website',
        job_level: 'Entry-Level/Junior',
        salary: 10000000,
        salary_frequency: 'per month',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        job_title: 'Web Developer',
        company: 'Telkom Indonesia',
        start_date: '2021-04-01',
        end_date: '2022-08-01',
        description: 'Web Developer Telkom Indonesia',
        job_level: 'Entry-Level/Junior',
        salary: 15000000,
        salary_frequency: 'per month',
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
    await queryInterface.bulkDelete('WorkExperiences', null, {});
  },
};
