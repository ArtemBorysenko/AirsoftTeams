const chai = require("chai")
const expect = chai.expect //should
const chaiHttp = require("chai-http")
const app = require("../../app")
const testHelper = require("../helpers/test-helpers")

chai.use(chaiHttp)

let accessToken
let refreshToken

describe("Check manager functionality  ", function() {
    this.timeout(2000)

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
        testHelper.createTestUser(
            (err, result) => {
                if (err) done(err)
                done()
            },
            "Manager@test.io",
            "Manager",
            "1234",
            800,
            true,
        )
    })

    before((done) => {
        testHelper.getTokens("Manager@test.io", "1234", (err, result) => {
            if (err) done(err)

            accessToken = result.accessToken
            refreshToken = result.refreshToken
            done()
        })
    })

    before((done) => {
        testHelper.getTokens("Player@test.io", "1234", async (err, result) => {
            if (err) done(err)

            testHelper.playerAddTeam((err, result) => {
                if (err) done(err)
                done()
            }, result.accessToken)
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

    after((done) => {
        testHelper.deleteUser(
            (err, result) => {
                if (err) done(err)
                done()
            },
            accessToken,
            "Manager@test.io",
        )
    })

    it("manager can approve adding a player to the team", function(done) {
        chai.request(app)
            .get("/manager/player/approve_team/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get all players", function(done) {
        chai.request(app)
            .get("/manager/player/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get players in team", function(done) {
        chai.request(app)
            .get("/manager/team/A")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get player by id", function(done) {
        chai.request(app)
            .get("/manager/player/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("manager can delete player from team", function(done) {
        chai.request(app)
            .delete("/manager/player/team/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })
})
