'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn("todos", "userid", {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
            schema: "public"
          }
        },
        allowNull: false
      }, { transaction })

      await queryInterface.addColumn("todos", "isCompleted", {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn("todos", "userid", { transaction })
      await queryInterface.removeColumn("todos", "isCompleted", { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
