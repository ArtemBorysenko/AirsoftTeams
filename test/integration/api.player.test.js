const chai = require("chai")
const expect = chai.expect //should
const chaiHttp = require("chai-http")
const app = require("../../app")
const testHelper = require("../helpers/test-helpers")

chai.use(chaiHttp)

let accessToken
let refreshToken

describe("Check player functionality  ", function() {
    this.timeout(1000)

    before((done) => {
        testHelper.createTestUser(
            (err, result) => {
                if (err) done(err)
                done()
            },
            "Player@test.io",
            "Player",
            "1234",
            700,
            true,
        )
    })

    before((done) => {
        testHelper.getTokens("Kolya2@player.ru", "1234", (err, result) => {
            if (err) done(err)

            accessToken = result.accessToken
            refreshToken = result.refreshToken
            done()
        })
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
            "Player@test.io",
        )
    })

    it("get all players", function(done) {
        chai.request(app)
            .get("/player/player/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get players in team", function(done) {
        chai.request(app)
            .get("/player/team/A")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get player by id", function(done) {
        chai.request(app)
            .get("/player/player/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("player can apply for addition in the team", function(done) {
        chai.request(app)
            .get("/player/team/add/A")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("player can exit the team", function(done) {
        chai.request(app)
            .post("/player/team/out/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })
})
