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
    await queryInterface.bulkInsert('Projects', [
      {
        user_id: 3,
        project_name: 'Develop Rakamin App',
        role: 'Project Manager',
        link: 'https://www.rakamin.com/',
        start_date: '2020-01-01',
        end_date: '2020-08-01',
        description: 'Develop Rakamin App with Express JS dan Next JS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        project_name: 'Calculator App',
        role: 'Front End Developer',
        link: 'https://www.calculator.com/',
        start_date: '2021-04-01',
        end_date: '2021-08-05',
        description: 'Front End Developer Calculator App',
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
    await queryInterface.bulkDelete('Projects', null, {});
  },
};
