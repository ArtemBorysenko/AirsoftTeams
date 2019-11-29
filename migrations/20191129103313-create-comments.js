'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => Promise.all([
    queryInterface.createTable('comments', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
      },
      blocked: {
        type: DataTypes.STRING
      },
      deleted: {
        type: DataTypes.STRING
      },
      actived: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }),


  ]),

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
  }
};
