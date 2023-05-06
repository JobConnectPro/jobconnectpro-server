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
        user_id: 2,
        company_id: 1,
        title: 'Front End Developer',
        description: 'Front End Developer (React JS, Next JS)',
        requirement: 'Pengalaman minimal 2 tahun',
        job_level: 'Associate/Supervisor',
        minimum_salary: 15000000,
        maximum_salary: 20000000,
        type: 'Onsite',
        location: 'Bekasi',
        starting_date: '2020-01-01',
        minimum_experience: 2,
        status: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        company_id: 1,
        title: 'Back End Developer',
        description: 'Back End Developer (Node JS, Express JS)',
        requirement: 'Pengalaman minimal 3 tahun',
        job_level: 'Associate/Supervisor',
        minimum_salary: 20000000,
        maximum_salary: 30000000,
        type: 'Remote',
        location: 'Jakarta',
        starting_date: '2020-01-01',
        minimum_experience: 3,
        status: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        company_id: 2,
        title: 'Android Developer',
        description: 'Android Developer (Java, Kotlin)',
        requirement: 'Pengalaman minimal 5 tahun',
        job_level: 'Associate/Supervisor',
        minimum_salary: 60000000,
        maximum_salary: 70000000,
        type: 'Remote',
        location: 'Surabaya',
        starting_date: '2023-04-30',
        minimum_experience: 5,
        status: '1',
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
