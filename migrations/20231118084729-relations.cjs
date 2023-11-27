'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('todos', 'userid', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('todos', 'userid');
  }
};
