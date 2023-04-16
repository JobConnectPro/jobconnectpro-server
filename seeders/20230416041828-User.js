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
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Aruf Rachman hakim',
        email: 'arufhakim@gmail.com',
        password:
          '$2b$10$NbLxxQ3zwC/sixqf0QTiBebq6cqC6Z0PoS6cmkgD4RRtR10s0yt0y',
        role: 'Admin',
        birthday: '1999-04-26',
        gender: 'Men',
        phone: '081335357589',
        address: 'Boulevard Garden VIII',
        summary: 'Hi im Rakamin Student!',
        salary_expectation: 15000000,
        photo: 'file',
        resume: 'file',
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
    await queryInterface.bulkDelete('Users', null, {});
  },
};
