const chai = require("chai")
const expect = chai.expect
const chaiHttp = require("chai-http")
const app = require("../app")
const jwt = require("jsonwebtoken")

chai.use(chaiHttp)

global.app = app
global.expect = expect
global.request = chai.request(app)

module.exports = (data = {}) => jwt.sign(data, "VERYSECRETKEY_2")
