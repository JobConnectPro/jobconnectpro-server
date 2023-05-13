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
    await queryInterface.bulkInsert('Companies', [
      {
        user_id: 2,
        sector_id: 1,
        company_name: 'Rakamin Academy',
        address: 'Jakarta',
        description: 'Mulai Karir Digitalmu dalam Hitungan Bulan atau Dapatkan Refund 100%',
        website: 'https://www.rakamin.com/',
        logo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        sector_id: 2,
        company_name: 'Bank Mandiri',
        address: 'Jakarta',
        description: 'Dengan dukungan sumber daya manusia yang profesional, Bank Mandiri terus berusaha mewujudkan masa depan Indonesia yang lebih baik',
        website: 'https://bankmandiri.co.id/',
        logo: null,
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
    await queryInterface.bulkDelete('Companies', null, {});
  },
};
