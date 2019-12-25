const request = require("request")
const bcrypt = require("bcryptjs")
//TODO created/delete user убеать модоели
const authDB = require("../../models/auth")
const userDB = require("../../models/user")

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

function createTestUser(username, role, password, id, team) {
    request({
        method: "POST",
        uri: "http://localhost:3000/auth/registration",
        options: {
            contentType: "application/x-www-form-urlencoded",
        },
        form: {
            id: id,
            username: username,
            password: password,
            user_role: role,
            team: team,
            isActive: true,
        },
    })
}

// function createTestUser(id, role, password, team) {
//     return authDB
//         .registration({
//             id: `${id}`,
//             username: `${role}${id}@test.io`,
//             user_role: `${role}`,
//             isActive: true, // isActive = false
//             isBlocked: false,
//             userCred: {
//                 id: `${id}`,
//                 password: bcrypt.hashSync(
//                     password,
//                     bcrypt.genSaltSync(10),
//                     null,
//                 ),
//             },
//             tokens: {
//                 id: `${id}`,
//                 token: null,
//                 refreshToken: null,
//             },
//             userComment: {
//                 id: `${id}`,
//                 blocked: null,
//                 deleted: null,
//                 actived: null,
//             },
//             user: {
//                 id: `${id}`,
//                 userId: 700,
//                 status: "Pending", // "Pending", "Approved", "Declined"
//             },
//         })
//         .then(() => {
//             return Promise.resolve()
//         })
// }

module.exports = {
    getTokens,
    createTestUser,
    deleteUser: userDB.deleteUser,
    deleteUserByName: userDB.deleteUserByName,
}
