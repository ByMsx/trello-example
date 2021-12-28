'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cards', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      columnId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Columns',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }, {

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cards');
  }
};
