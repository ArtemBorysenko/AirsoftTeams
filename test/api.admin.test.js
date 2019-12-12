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

describe("Check admin functionality  ", function() {
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
            .get("/admin/manager/17")
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
            .get("/admin/player/11")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("activonition user", function(done) {
        chai.request(app)
            .post("/admin/player/approve/11")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("blocking user", function(done) {
        chai.request(app)
            .post("/admin/player/blocked/12")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it("delete user by id", function(done) {
        chai.request(app)
            .delete("/admin/delete/29")
            .set("Authorization", `Bearer ${accessToken}`)
            .end(async function(err, res) {
                if (err) done(err)
                expect(res).to.have.status(200)
                done()
            })
    })
})
