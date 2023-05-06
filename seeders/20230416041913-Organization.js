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
    await queryInterface.bulkInsert('Organizations', [
      {
        user_id: 3,
        organization: 'BEM FILKOM UB 2020',
        role: 'Menteri Advokesma',
        start_date: '2020-04-01',
        end_date: '2020-08-01',
        description: 'Menteri Advokesma BEM FILKOM UB 2020',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        organization: 'EM UB 2021',
        role: 'Menteri PSDM',
        start_date: '2020-09-01',
        end_date: '2020-12-01',
        description: 'Menteri PSDM EM UB 2021',
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
    await queryInterface.bulkDelete('Organizations', null, {});
  },
};
