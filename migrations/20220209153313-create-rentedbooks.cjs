module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rentedbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rentAt: {
        type: Sequelize.DATE,
      },
      expiredAt: {
        type: Sequelize.DATE,
      },
      returnedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      bookId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Books',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rentedbooks');
  },
};
