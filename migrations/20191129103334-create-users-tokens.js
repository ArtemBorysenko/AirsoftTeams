'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => Promise.all([
    queryInterface.createTable('users_tokens', {

      id: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING
      },
      refreshToken: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        //autoIncrement: true,
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
