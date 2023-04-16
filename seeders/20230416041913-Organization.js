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
        user_id: 1,
        organization: 'Eksekutif Mahasiswa Universitas Brawijaya',
        role: 'Menteri Advokesma',
        start_date: '2020-01-01',
        end_date: '2020-08-01',
        description: 'Menjalankan tugas dengan baik',
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
