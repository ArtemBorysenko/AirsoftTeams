const request = require("request")

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

function createTestUser(
    callback,
    username,
    role,
    password,
    id,
    isActive,
    team,
) {
    request(
        {
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
                isActive: isActive,
            },
        },
        (err) => {
            callback(err)
        },
    )
}

function playerAddTeam(callback, accessToken) {
    request(
        {
            method: "GET",
            uri: "http://localhost:3000/player/team/add/A",
            options: {
                contentType: "application/x-www-form-urlencoded",
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
        (err) => {
            callback(err)
        },
    )
}

function deleteUser(callback, accessToken, params) {
    request(
        {
            method: "DELETE",
            uri: `http://localhost:3000/admin/delete/${params}`,
            options: {
                contentType: "application/x-www-form-urlencoded",
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
        (err) => {
            callback(err)
        },
    )
}

module.exports = {
    getTokens,
    createTestUser,
    playerAddTeam,
    deleteUser,
}
