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
    await queryInterface.bulkInsert('Trainings', [
      {
        user_id: 3,
        title: 'React JS - Web Frontend Development',
        organizer: 'Sanbercode',
        start_date: '2020-03-01',
        end_date: '2020-04-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        title: 'Fresh Graduate Academy (FGA) - Database Design & Programming with SQL',
        organizer: 'Kementerian Komunikasi dan Informatika RI',
        start_date: '2021-01-01',
        end_date: '2021-04-01',
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
    await queryInterface.bulkDelete('Trainings', null, {});
  },
};
