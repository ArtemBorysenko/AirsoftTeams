const chai = require("chai")
const expect = chai.expect //should
const supertest = require("supertest")
const chaiHttp = require("chai-http")
const app = require("../app")
const issueToken = require("./helpers")
const testHelper = require("./helpers/test-helpers")
const config = require("../config")

const users = require("../test/data/testUsers")

chai.use(chaiHttp)

let accessToken
let refreshToken

describe("Check auth functionality (registration, login, refreshtoken, logout)", function() {
    this.timeout(5000)

    before(async function() {
        await new Promise((res) => setTimeout(res, 1500))
    })

    before((done) => {
        testHelper.getTokens("Admin@admin.ru", "1234", (err, result) => {
            if (err) done(err)

            accessToken = result.accessToken
            refreshToken = result.refreshToken
            done()
        })
    })

    it("User can registration", function(done) {
        chai.request(app)
            .post("/auth/registration/")
            .send({
                username: "Managertest47@test.io",
                password: "1234",
                user_role: "Manager",
                team: "A",
            })
            .end(async function(err, res) {
                setTimeout(() => {
                    expect(res).to.have.status(200)
                    done()
                }, 0)
            })
    })

    it("User can succesfully login with valid username and password", function(done) {
        chai.request(app)
            .post("/auth/login/")
            .send({
                username: "Manager5@test.io",
                password: "1234",
            })
            .end(async function(err, res) {
                // setTimeout(() => {
                expect(res).to.have.status(200)
                done()
                // }, 1000)
            })
    })

    it("User can get new access token using refresh token", function(done) {
        chai.request(app)
            .post("/auth/refreshtoken/")
            .send({
                refreshToken: refreshToken,
            })
            .end(async function(err, res) {
                // setTimeout(() => {
                expect(res).to.have.status(200)
                done()
                // }, 1000)
            })
    })

    it("User can logout", function(done) {
        chai.request(app)
            .get("/auth/logout/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                // setTimeout(() => {
                expect(res).to.have.status(200)
                done()
                // }, 1000)
            })
    })
})
