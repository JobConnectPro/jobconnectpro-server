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
        user_id: 3,
        attainment_id: 3,
        school: 'SMA Negeri 5 Surabaya',
        major: 'IPA',
        description: 'Siswa Terbaik',
        start_date: '2017-01-01',
        end_date: '2019-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        attainment_id: 9,
        school: 'Universitas Brawijaya',
        major: 'Sistem Informasi',
        description: 'Lulus dengan IPK 4.00 dan Cumlaude',
        start_date: '2020-01-01',
        end_date: '2023-01-01',
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
