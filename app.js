const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const app = express()
const config = require("./config")
const server = http.createServer(app)
const path = require("path")
const logger = require("morgan")

const io = require("./sockets/index")(server)
require("./connections/psql-connection.js")

const index = require("./routes/index")

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

app.use("/", index)

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        errors: err.errors,
    })
})

server.listen(config.port, function() {
    console.log("Example app listening on port " + server.address().port)
})

module.exports = app
