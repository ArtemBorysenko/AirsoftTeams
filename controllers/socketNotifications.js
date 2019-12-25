const config = require("../config")

function ntfcReg(req) {
    try {
        if (req.body.user_role === "Manager") {
            req.io.sockets
                .to(config.rooms[0])
                .emit("Manager_is_reg", " message")
        }
    } catch (err) {
        console.log("error ntfcReg " + err)
    }
}
function ntfcApprove(req) {
    try {
        req.io.sockets
            .to(config.rooms[0])
            .to(config.rooms[2])
            .emit("Player_is_approved", " message")
    } catch (err) {
        console.log("error ntfcApprove " + err)
    }
}

function ntfcSwitch(req) {
    try {
        req.io.sockets
            .to(config.rooms[0])
            .to(config.rooms[1])
            .emit("Player_switch_team", " message")
    } catch (err) {
        console.log("error ntfcSwitch " + err)
    }
}

function ntfcDeleted(req) {
    try {
        req.io.sockets
            .to(config.rooms[0])
            .to(config.rooms[2])
            .emit("Player_is_deleted", " message")
    } catch (err) {
        console.log("error ntfcDeleted" + err)
    }
}

module.exports = {
    ntfcReg,
    ntfcApprove,
    ntfcSwitch,
    ntfcDeleted,
}
