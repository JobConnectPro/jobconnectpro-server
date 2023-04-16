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
    await queryInterface.bulkInsert('Education', [
      {
        user_id: 1,
        attainment_id: 1,
        school: 'Universitas Brawijaya',
        major: 'Sistem Informasi',
        description: 'Menjalankan tugas dengan baik',
        start_date: '2020-01-01',
        end_date: '2020-08-01',
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
    await queryInterface.bulkDelete('Education', null, {});
  },
};
