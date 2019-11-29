'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => Promise.all([

    queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      user_role: {
        type: DataTypes.ENUM('Player', 'Manager', 'Admin')
      },
      team: {
        type: DataTypes.ENUM('A', 'B', 'want A', 'want B')
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      usercredId: {
        type: DataTypes.INTEGER,
        //autoIncrement: true,
      },
      commentId: {
        type: DataTypes.INTEGER,
        //autoIncrement: true,
      }

    }),


  ]),

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
  }
};
