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
    await queryInterface.bulkInsert('Attainments', [
      {
        attainment: 'Less than high school',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'High School',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Graduated from high school',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Vocational course',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Completed vocational course',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Associate studies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Completed associate degree',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Bachelor studies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Bachelor degree graduate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Graduate studies (Master)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Master degree graduate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Post-graduate studies (Doctorate)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attainment: 'Doctoral degree graduate',
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
    await queryInterface.bulkDelete('Attainments', null, {});
  },
};
