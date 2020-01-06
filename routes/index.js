const express = require("express")
const router = express.Router()
const index = require("./v1/index")

router.use("/", index)

module.exports = router
