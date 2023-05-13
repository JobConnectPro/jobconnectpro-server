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
        name: 'Budi Santoso',
        email: 'budi@gmail.com',
        password: '$2b$10$ZT/zJX/x6wZqr5ZwyUAXmOsipIuc.kUZxqnZ5VgMh5yEtvbyVqWvW',
        role: 'Admin',
        birthday: '2023-04-24',
        gender: 'Man',
        phone: '081335357589',
        address: 'Jaksa Agung No. 01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hakim Mulyono',
        email: 'hakim@gmail.com',
        password: '$2b$10$ZT/zJX/x6wZqr5ZwyUAXmOsipIuc.kUZxqnZ5VgMh5yEtvbyVqWvW',
        role: 'Employer',
        birthday: '1999-04-26',
        gender: 'Man',
        phone: '083423438594',
        address: 'Pakis Haji No. 03',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Angel Gabriella',
        email: 'gabriellangel@gmail.com',
        password: '$2b$10$1AgYFOnGyF1q1oT6Svwva.7gTGyvM/O2oleUue2m6GpfTTWe6q5Ru',
        role: 'Seeker',
        birthday: '1999-04-26',
        gender: 'Woman',
        phone: '081335357589',
        address: 'Boulevard L3 No. 41',
        summary: 'Hi im Gabriella Angel',
        salary_expectation: 12000000,
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
