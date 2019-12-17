const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const jwtMiddleware = require("express-jwt")
const jwt = require("jsonwebtoken")
const config = require("./config")
const app = express()
const server = http.createServer(app)
const path = require("path")
const logger = require("morgan")

// const session = require("express-session")({
//     secret: "my-secret",
//     resave: true,
//     saveUninitialized: true,
// })
//
// const sharedsession = require("express-socket.io-session")

const io = require("socket.io").listen(server)

require("./connections/psql-connection.js")

const routerAdmin = require("./routes/admin")
const routerManager = require("./routes/manager")
const routerPlayer = require("./routes/player")
const routerAuth = require("./routes/auth")

const getServerStatus = require("./controllers/conectionStatus")

app.use(logger("dev"))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)

app.use(express.static(path.join(__dirname, "../AirsoftTeams_frontend")))

app.use(function(req, res, next) {
    req.io = io
    next()
})

app.get("/echo", function(req, res) {
    res.status(200).json({Server: "online"})
})

app.get("/status", async function(req, res) {
    res.status(200).json(await getServerStatus.getServerStatus())
})

app.use("/auth", routerAuth)
app.use(
    jwtMiddleware({
        secret: config.secret,
    }),
    (req, res, next) => {
        let token = req.headers.authorization
        token = token.slice(7, token.length)
        const decoded = jwt.decode(token)
        if (decoded.isBlocked === true || decoded.isActive === false)
            res.send("Пользователь заблокирован")
        req.username = decoded.username
        req.id = decoded.id
        req.role = decoded.role
        req.isBlocked = decoded.isBlocked
        req.isActive = decoded.isActive
        next()
    },
)
app.use("/admin", routerAdmin)
app.use("/manager", routerManager)
app.use("/player", routerPlayer)

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        errors: err.errors,
    })
})

server.listen(3000, function() {
    console.log("Example app listening on port " + server.address().port)
})

// io.use(sharedsession(session))
let count = 0

io.sockets.on("connection", function(socket) {
    // socket.handshake.session.userdata = socket.id
    // socket.handshake.session.save()

    const id = count++

    socket.on("adduser", function(AccessToken) {
        const token = jwt.decode(AccessToken)
        if (token) {
            socket.role = token.role
            config.users[id] = {
                socketId: socket.id,
                name: token.username,
                id: token.id,
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

module.exports = app
