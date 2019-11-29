'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([

    Promise.resolve(),

    queryInterface.bulkInsert('comments', [{
      id: 1,
      blocked: null,
      deleted: null,
      actived: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]),
    queryInterface.bulkInsert('users_creds', [{
      id: 1,
      password: bcrypt.hashSync(process.env.DB_ADMIN_PASSWORD || '1234', bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]),

    queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'Admin_NEW',
      user_role: 'Admin',
      team: null,
      isBlocked: false,
      isActive: true,
       usercredId: 3,
       commentId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]),


    queryInterface.bulkInsert('users_tokens', [{
      id: 1,
      token: null,
      refreshToken: null,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]),
  ]),

  down: (queryInterface, Sequelize) => {
    return  Promise.resolve()
  }
};
