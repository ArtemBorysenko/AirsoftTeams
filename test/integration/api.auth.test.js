const chai = require("chai")
const expect = chai.expect //should
const chaiHttp = require("chai-http")
const app = require("../../app")
const testHelper = require("../helpers/test-helpers")

chai.use(chaiHttp)

let accessToken
let refreshToken

describe("Check auth functionality (registration, login, refreshtoken, logout)", function() {
    this.timeout(1000)

    before((done) => {
        testHelper.getTokens(
            "Admin@airsoftteams.org",
            "1234",
            (err, result) => {
                if (err) done(err)

                accessToken = result.accessToken
                refreshToken = result.refreshToken
                done()
            },
        )
    })

    after((done) => {
        testHelper.getTokens(
            "Admin@airsoftteams.org",
            "1234",
            (err, result) => {
                if (err) done(err)

                accessToken = result.accessToken
                refreshToken = result.refreshToken
                done()
            },
        )
    })

    after((done) => {
        testHelper.deleteUser(
            (err, result) => {
                if (err) done(err)
                done()
            },
            accessToken,
            "REGISTRATION@test.io",
        )
    })

    it("User can registration", function(done) {
        chai.request(app)
            .post("/auth/registration/")
            .send({
                username: "REGISTRATION@test.io",
                password: "1234",
                user_role: "Manager",
                isActive: false,
                isBlocked: false,
            })
            .end(async function(err, res) {
                setTimeout(() => {
                    expect(res).to.have.status(201)
                    done()
                }, 0)
            })
    })

    it("User can succesfully login with valid username and password", function(done) {
        chai.request(app)
            .post("/auth/login/")
            .send({
                username: "REGISTRATION@test.io",
                password: "1234",
            })
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("User can get new access token using refresh token", function(done) {
        chai.request(app)
            .post("/auth/refreshtoken/")
            .send({
                refreshToken: refreshToken,
            })
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("User can logout", function(done) {
        chai.request(app)
            .get("/auth/logout/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })
})
