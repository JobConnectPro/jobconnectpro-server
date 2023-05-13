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
    await queryInterface.bulkInsert('UserSkills', [
      {
        user_id: 3,
        skill_id: 1,
        level: 'Advanced',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        skill_id: 2,
        level: 'Advanced',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        skill_id: 5,
        level: 'Basic',
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
    await queryInterface.bulkDelete('UserSkills', null, {});
  },
};
