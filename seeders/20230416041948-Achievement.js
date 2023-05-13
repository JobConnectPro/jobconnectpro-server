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
    await queryInterface.bulkInsert('Achievements', [
      {
        user_id: 3,
        title: 'Best Group Final Project',
        issuer: 'Rakamin Academy',
        date: '2020-01-01',
        description: 'Best Group Final Project Rakamin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        title: 'Winner Hackathon',
        issuer: 'Dicoding',
        date: '2019-03-02',
        description: 'Winner Hackathon Dicoding',
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
    await queryInterface.bulkDelete('Achievements', null, {});
  },
};
