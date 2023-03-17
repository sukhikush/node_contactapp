"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contactinfos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      conatct_info_type: {
        type: Sequelize.STRING,
      },
      conatct_info_data: {
        type: Sequelize.STRING,
      },
      conatct_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contactinfos");
  },
};
