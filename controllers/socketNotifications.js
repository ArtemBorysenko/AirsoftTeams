const config = require("../config")

function ntfcReg(req, res, next) {
    if (req.body.user_role === "Manager") {
        req.io.sockets.to(config.rooms[0]).emit("Manager_is_reg", " message")
    }
    console.log("ntfcReg")
    // next();
}
function ntfcApprove(req, res, next) {
    req.io.sockets
        .to(config.rooms[0])
        .to(config.rooms[2])
        .emit("Player_is_approved", " message")

    console.log("ntfcApprove")
    // next();
}

function ntfcSwitch(req, res, next) {
    req.io.sockets
        .to(config.rooms[0])
        .to(config.rooms[1])
        .emit("Player_switch_team", " message")

    console.log("ntfcSwitch")
    // next();
}

function ntfcDeleted(req, res, next) {
    req.io.sockets
        .to(config.rooms[0])
        .to(config.rooms[2])
        .emit("Player_is_deleted", " message")

    console.log("ntfcDeleted")
    // next();
}

module.exports = {
    ntfcReg,
    ntfcApprove,
    ntfcSwitch,
    ntfcDeleted,
}
