const db = require("../models/database/db")
const DatabaseError = require("../errors/database-error")

async function getPlayersByTeam(id) {
    return db
        .getAllByTeam(id)
        .then((user) => {
            if (!user) {
                throw new Error("Team not found")
            }
            return user
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function addPlayerInTeam(userId, teamId) {
    return db
        .getById(userId)
        .then(async (user) => {
            if (
                !user ||
                user.user_role !== "Player" ||
                user.team === "A" ||
                user.team === "B" ||
                (teamId !== "A" && teamId !== "B")
            ) {
                throw new Error("Player not found or invalid team")
            }
            await db.changeTeam(user.id, teamId)
            return "Запрос отправлен"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function outPlayerWithTeam(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (!user || user.user_role !== "Player") {
                throw new Error("Team not found")
            }
            db.deleteTeam(user.id, comment)
            return "Игрок покинул команду"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

async function switchTeam(id) {
    return db
        .getById(id)
        .then((user) => {
            if (
                !user ||
                user.user_role !== "Player"
                //(user.team !== "B" && user.team !== "A")
            ) {
                return new Error("Team not found")
            }
            if (user.team === "A") db.changeTeam(user.id, "B", "switch team")
            if (user.team === "B") db.changeTeam(user.id, "A", "switch team")
            return "Запрос отправлен"
        })
        .catch((err) => {
            throw new DatabaseError(err)
        })
}

module.exports = {
    getPlayersByTeam,
    addPlayerInTeam,
    outPlayerWithTeam,
    switchTeam,
}
