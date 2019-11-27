//const Sequelize = require('sequelize');
//const db = require('../../config/database');

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) =>
{
    const users_creds = sequelize.define('users_creds', {
        password: {
            type: DataTypes.STRING
        }
        },
        {
            instanceMethods: {
                generateHash:  async function() {
                     return await bcrypt.hash(password, bcrypt.genSaltSync(10));
                },
                validPassword: async function(password) {
                     return await bcrypt.compare(password, this.password);
                }
            }
        });
    return users_creds;
}