const sequelize = require("../connections/database")
const bcrypt = require("bcryptjs")

async function registration(newUser) {
    return await sequelize.models.users
        .findOne({where: {username: newUser.username}})
        .then((user) => {
            if (user) {
                throw new Error("User with this email already exist.")
            }
            return sequelize.models.users
                .create(newUser, {
                    include: [{all: true}],
                })
                .then((user) => {
                    return user
                })
        })
        .catch((err) => {
            throw err
        })
}

async function login(username, password) {
    return sequelize.models.users
        .findOne({where: {username: username}})
        .then((user) => {
            return sequelize.models.users_creds
                .findOne({where: {id: user.id}})
                .then(async (users_creds) => {
                    if (!bcrypt.compareSync(password, users_creds.password)) {
                        throw new Error("wrong login or password")
                    }
                    return user
                })
        })
        .catch((err) => {
            throw err
        })
}

module.exports = {
    registration,
    login,
}
