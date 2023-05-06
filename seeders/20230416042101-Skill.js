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
    await queryInterface.bulkInsert('Skills', [
      {
        skill: 'Node JS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'React JS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'Next JS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'MySQL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'PostgreSQL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'Java',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'PHP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        skill: 'Laravel',
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
    await queryInterface.bulkDelete('Skills', null, {});
  },
};
