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

describe("Check player functionality  ", function() {
    this.timeout(5000)

    before(async function() {
        await new Promise((res) => setTimeout(res, 1500))
    })

    before(async () => {
        await testHelper.createTestUser("700", "Player", "1234")
    })

    before((done) => {
        testHelper.getTokens("Player700@test.ru", "1234", (err, result) => {
            if (err) done(err)

            accessToken = result.accessToken
            refreshToken = result.refreshToken
            done()
        })
    })

    after(async () => {
        await testHelper.deleteUser(700)
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
            .get("/player/player/11")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("player can switch team", function(done) {
        chai.request(app)
            .get("/player/switch/team/")
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
