'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salePrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      boughtPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      imageURL: {
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
