const chai = require("chai")
const expect = chai.expect //should
const chaiHttp = require("chai-http")
const app = require("../../app")
const testHelper = require("../helpers/test-helpers")

chai.use(chaiHttp)

let accessToken
let refreshToken

describe("Check manager functionality  ", function() {
    this.timeout(1000)

    before(async () => {
        await testHelper.createTestUser("Player@test.io", "Player", "1234", 700)
        await testHelper.createTestUser("Manager@test.io", "Manager", "1234")
    })

    before((done) => {
        testHelper.getTokens("Danil@manager.ru", "1234", (err, result) => {
            if (err) done(err)

            accessToken = result.accessToken
            refreshToken = result.refreshToken
            done()
        })
    })

    before((done) => {
        testHelper.getTokens("Player@test.io", "1234", (err, result) => {
            if (err) done(err)

            playerAccessToken = result.accessToken
            playerRefreshToken = result.refreshToken
            done()
        })
    })

    after(async () => {
        await testHelper.deleteUserByName("Player@test.io")
        await testHelper.deleteUserByName("Manager@test.io")
    })

    it("manager can approve adding a player to the team", function(done) {
        chai.request(app)
            .get("/player/team/add/A")
            .set("Authorization", `Bearer ${playerAccessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
        chai.request(app)
            .get("/manager/player/approve_team/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get all players", function(done) {
        chai.request(app)
            .get("/manager/player/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get players in team", function(done) {
        chai.request(app)
            .get("/manager/team/A")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get player by id", function(done) {
        chai.request(app)
            .get("/manager/player/15")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("manager can delete player from team", function(done) {
        chai.request(app)
            .delete("/manager/player/team/15")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })
})
