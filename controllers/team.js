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

async function switchTeam(id, comment) {
    return db
        .getById(id)
        .then((user) => {
            if (
                !user
                // убрать поверки и А и Б user.user_role !== "Player" ||
                // (user.team !== "B" && user.team !== "A")
            ) {
                return new Error("Team not found")
            }
            // TODO уерать "A" и "B"  из кода
            // изменить А на 1 Б на 2
            // соззадть таблицу для названий команд
            // убрать даты
            // отдельная таблица ид тим статус(пендинг, апрус, деклаинд) время выводить все таблицу

            // switch перендават в пост
            if (user.team === "A") db.changeTeam(user.id, "B", comment)
            if (user.team === "B") db.changeTeam(user.id, "A", comment)
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
