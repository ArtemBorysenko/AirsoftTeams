const chai = require("chai")
const expect = chai.expect //should
const chaiHttp = require("chai-http")
const app = require("../../app")
const testHelper = require("../helpers/test-helpers")

chai.use(chaiHttp)

let accessToken
let refreshToken

describe("Check admin functionality  ", function() {
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
            false,
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

    it("get all managers", function(done) {
        chai.request(app)
            .get("/admin/manager/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get manager by id", function(done) {
        chai.request(app)
            .get("/admin/manager/800")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get all players", function(done) {
        chai.request(app)
            .get("/admin/player/")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("get player by id", function(done) {
        chai.request(app)
            .get("/admin/player/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("activonition user", function(done) {
        chai.request(app)
            .post("/admin/player/approve/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("blocking user", function(done) {
        chai.request(app)
            .post("/admin/player/blocked/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("delete user by id", function(done) {
        chai.request(app)
            .delete("/admin/delete/700")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("delete user by username", function(done) {
        chai.request(app)
            .delete("/admin/delete/Manager@test.io")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })
})
