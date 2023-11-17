'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction });
      await queryInterface.addColumn('users', 'email', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      }, { transaction });
      await queryInterface.addColumn('users', 'phone', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction });
      await queryInterface.addColumn('users', 'password', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }, { transaction });
      await queryInterface.addColumn('users', 'userName', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      }, { transaction });
      await queryInterface.addColumn('users', 'profilePic', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'lastName', { transaction });
      await queryInterface.removeColumn('users', 'email', { transaction });
      await queryInterface.removeColumn('users', 'phone', { transaction });
      await queryInterface.removeColumn('users', 'password', { transaction });
      await queryInterface.removeColumn('users', 'userName', { transaction });
      await queryInterface.removeColumn('users', 'profilePic', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
