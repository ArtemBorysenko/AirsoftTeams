const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect
const faker = require("faker")

const authCntr = require("../../controllers/auth")
const playerCntr = require("../../controllers/player")

const authDB = require("../../models/auth")
const userDB = require("../../models/user")

const tokenDB = require("../../models/token")

describe("UserRepository", function() {
    const testUser = {
        id: 1,
        username: "test@testmail.io",
        user_role: "Player",
        isActive: true,
        isBlocked: false,
        userCred: {
            password: "1234",
        },
    }

    const testToken = {
        token: "Test_Access_Token",
        refreshToken: "Tet_Refresh_Token",
    }

    describe("Get user by id", function() {
        it("User can get user using id", async function() {
            const stubUserDB = sinon
                .stub(userDB, "getUserById")
                .returns(testUser)

            const user = await playerCntr.getPlayer(1)

            expect(stubUserDB.calledOnce).to.be.true

            console.log("user : ", user)
            expect(user.username).to.equal(testUser.username)
            expect(user.user_role).to.equal(testUser.user_role)
            expect(user.isActive).to.equal(testUser.isActive)
            expect(user.isBlocked).to.equal(testUser.isBlocked)
        })
    })

    describe("Auth", function() {
        it("User can get access token and refresh token using succesfully login", async function() {
            const stubAuthDB = sinon.stub(authDB, "login").returns(testUser)
            const stubTokenDB = sinon
                .stub(tokenDB, "addToken")
                .returns(testToken)

            const user = await authCntr.logIn(
                testUser.username,
                testUser.userCred.password,
            )

            expect(stubAuthDB.calledOnce).to.be.true
            expect(stubTokenDB.calledOnce).to.be.true

            console.log("Token : ", user)
            expect(user.token).to.equal(testToken.token)
            expect(user.refreshToken).to.equal(testToken.refreshToken)
        })
    })

    describe("registrations", function() {
        it("created new user", async function() {
            const stub = sinon.stub(authCntr, "registration").returns(testUser)
            const user = await authCntr.registration(testUser)
            expect(stub.calledOnce).to.be.true
            expect(user.username).to.equal(testUser.username)
            expect(user.user_role).to.equal(testUser.user_role)
            expect(user.isActive).to.equal(testUser.isActive)
            expect(user.isBlocked).to.equal(testUser.isBlocked)
        })
    })
})
