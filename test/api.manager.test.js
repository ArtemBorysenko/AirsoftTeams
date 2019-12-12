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

describe("Check manager functionality  ", function() {
    this.timeout(5000)
    before(async function() {
        await new Promise((res) => setTimeout(res, 1500))
    })

    before((done) => {
        testHelper.createTestUser("700", "Manager", "1234", (err) => {
            // if (err) done(err)

            done()
        })
    })

    before((done) => {
        testHelper.getTokens("Manager700@test.ru", "1234", (err, result) => {
            if (err) done(err)

            accessToken = result.accessToken
            refreshToken = result.refreshToken
            done()
        })
    })

    after(() => {
        testHelper.deleteUser(700)
    })

    it("get all players", function(done) {
        chai.request(app)
            .get("/manager/player/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                // if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get players in team", function(done) {
        chai.request(app)
            .get("/manager/team/A")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                // if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get player by id", function(done) {
        chai.request(app)
            .get("/manager/player/11")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                // if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("manager can delete player from team", function(done) {
        chai.request(app)
            .delete("/manager/player/team/14")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                // if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("manager can approve adding a player to the team", function(done) {
        chai.request(app)
            .get("/manager/player/approve_team/15")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                // if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })
})
