const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = function(server) {
    if (config.SOCKETS_MODULE === "OFF")
        return console.log("Socket status: OFF")

    const io = require("socket.io").listen(server)

    let count = 0

    io.sockets.on("connection", function(socket) {
        const id = count++

        socket.on("adduser", function(AccessToken) {
            const token = jwt.decode(AccessToken)
            if (token) {
                socket.role = token.role
                config.users[id] = {
                    id: token.id,
                    socketId: socket.id,
                    name: token.username,
                    role: token.role,
                }
                switch (token.role) {
                    case "Admin": {
                        socket.join(config.rooms[0])
                        break
                    }
                    case "Manager": {
                        socket.join(config.rooms[1])
                        break
                    }
                    case "Player": {
                        socket.join(config.rooms[2])
                        break
                    }
                }

                socket.emit("updateName", token)

                socket.emit("updateUsers", config.users)
                socket.broadcast.emit("updateUsers", config.users)
            }
        })

        socket.on("disconnect", () => {
            delete config.users[id]
            socket.broadcast.emit("updateUsers", config.users)
        })
    })
}
