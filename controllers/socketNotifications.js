const config = require("../config")

function ntfcReg(req) {
    try {
        if (req.body.user_role === "Manager") {
            req.io.sockets
                .to(config.rooms[0])
                .emit("Manager_is_reg", " message")
        }
    } catch (e) {
        console.log("error ntfcReg" + e)
    }
}
function ntfcApprove(req) {
    try {
        req.io.sockets
            .to(config.rooms[0])
            .to(config.rooms[2])
            .emit("Player_is_approved", " message")
    } catch (e) {
        console.log("error ntfcApprove" + e)
    }
}

function ntfcSwitch(req) {
    try {
        req.io.sockets
            .to(config.rooms[0])
            .to(config.rooms[1])
            .emit("Player_switch_team", " message")
    } catch (e) {
        console.log("error ntfcSwitch" + e)
    }
}

function ntfcDeleted(req) {
    try {
        req.io.sockets
            .to(config.rooms[0])
            .to(config.rooms[2])
            .emit("Player_is_deleted", " message")
    } catch (e) {
        console.log("error ntfcDeleted" + e)
    }
}

module.exports = {
    ntfcReg,
    ntfcApprove,
    ntfcSwitch,
    ntfcDeleted,
}
