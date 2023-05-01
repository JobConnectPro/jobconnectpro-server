'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Jobs', 'description', {
      allowNull: false,
      type: Sequelize.TEXT,
    });

    await queryInterface.changeColumn('Jobs', 'requirement', {
      allowNull: false,
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Jobs', 'description', {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Jobs', 'requirement', {
      allowNull: false,
      type: Sequelize.STRING,
    });
  },
};
