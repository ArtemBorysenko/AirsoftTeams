const request = require("request")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const uuid = require("uuid/v4")
const db = require("../../models/database/db")

function getTokens(username, password, callback) {
    request(
        {
            method: "POST",
            uri: "http://localhost:3000/auth/login",
            options: {
                contentType: "application/x-www-form-urlencoded",
            },
            form: {
                username: username,
                password: password,
            },
        },
        (err, res, body) => {
            callback(null, {
                accessToken: JSON.parse(body).token,
                refreshToken: JSON.parse(body).refreshToken,
            })
        },
    )
}

// Создавать и удалять пользователя через контролер или через запрос
function createTestUser(id, role, password, callback) {
    return db
        .registration({
            id: `${id}`,
            username: `${role}${id}@test.io`,
            user_role: `${role}`,
            team: "B",
            isActive: true, // isActive = false
            isBlocked: false,
            usercred: {
                id: `${id}`,
                password: bcrypt.hashSync(
                    password,
                    bcrypt.genSaltSync(10),
                    null,
                ),
            },
            tokens: {
                id: `${id}`,
                token: null,
                refreshToken: null,
            },
            comment: {
                id: `${id}`,
                blocked: null,
                deleted: null,
                actived: null,
            },
        })
        .then(() => {
            return Promise.resolve()
        })
}

module.exports = {
    getTokens,
    createTestUser,
    deleteUser: db.deleteUser,
    deleteUserByName: db.deleteUserByName,
}
