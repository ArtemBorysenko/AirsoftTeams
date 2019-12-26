const sequelize = require("../connections/database")
const bcrypt = require("bcryptjs")

async function registration(newUser) {
    try {
        const user = await sequelize.models.users.findOne({
            where: {username: newUser.username},
        })
        if (user) {
            throw new Error("User with this email already exist.")
        }
        return await sequelize.models.users.create(newUser, {
            include: [{all: true}],
        })
    } catch (err) {
        throw err
    }
}

async function login(username, password) {
    try {
        const user = await sequelize.models.users.findOne({
            where: {username: username},
        })
        const usersCreds = await sequelize.models.users_creds.findOne({
            where: {id: user.id},
        })
        if (!bcrypt.compareSync(password, usersCreds.password)) {
            throw new Error("wrong login or password.")
        }
        return user
    } catch (err) {
        throw err
    }
}

module.exports = {
    registration,
    login,
}
