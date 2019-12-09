const config = require("../config")

function ntfcReg(req) {
    if (req.body.user_role === "Manager") {
        req.io.sockets.to(config.rooms[0]).emit("Manager_is_reg", " message")
    }
    console.log("ntfcReg")
}
function ntfcApprove(req) {
    req.io.sockets
        .to(config.rooms[0])
        .to(config.rooms[2])
        .emit("Player_is_approved", " message")

    console.log("ntfcApprove")
}

function ntfcSwitch(req) {
    req.io.sockets
        .to(config.rooms[0])
        .to(config.rooms[1])
        .emit("Player_switch_team", " message")

    console.log("ntfcSwitch")
}

function ntfcDeleted(req) {
    req.io.sockets
        .to(config.rooms[0])
        .to(config.rooms[2])
        .emit("Player_is_deleted", " message")

    console.log("ntfcDeleted")
}

module.exports = {
    ntfcReg,
    ntfcApprove,
    ntfcSwitch,
    ntfcDeleted,
}
