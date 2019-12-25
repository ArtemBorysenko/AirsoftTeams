const chai = require("chai")
const expect = chai.expect //should
const chaiHttp = require("chai-http")
const app = require("../../app")
const testHelper = require("../helpers/test-helpers")

chai.use(chaiHttp)

let accessToken
let refreshToken
// TODO дописать тесты ошибок
describe("Check admin functionality  ", function() {
    this.timeout(1000)

    before(async () => {
        await testHelper.createTestUser("Player@test.io", "Player", "1234")
        await testHelper.createTestUser("Manager@test.io", "Manager", "1234")
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

    after(async () => {
        await testHelper.deleteUserByName("Player@test.io")
        await testHelper.deleteUserByName("Manager@test.io")
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
            .get("/admin/manager/14")
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
            .get("/admin/player/15")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("activonition user", function(done) {
        chai.request(app)
            .post("/admin/player/approve/15")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("blocking user", function(done) {
        chai.request(app)
            .post("/admin/player/blocked/15")
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
})
