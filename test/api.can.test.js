const chai = require("chai")
const expect = chai.expect //should
const supertest = require("supertest")
const chaiHttp = require("chai-http")
const app = require("../app")
const issueToken = require("./helpers")

const users = require("../test/data/testUsers")

chai.use(chaiHttp)

describe("User can registration", function() {
    // TODO before созадть тестоую бд с полями after удалить
    // тесты поделить по ролям(admin, manager, player)
    //
    it("registration Manager", function(done) {
        this.timeout(15000)
        chai.request(app)
            .post("/registration/")
            .send({
                username: "testManager39",
                password: "1234",
                user_role: "Manager",
                team: "A",
            })
            .end(async function(err, res) {
                setTimeout(() => {
                    expect(res).to.have.status(200)
                    done()
                }, 3000)
            })
    })
})

describe("Player can get all players", function() {
    it("Player get all palyers", function(done) {
        chai.request(app)
            .get("/player/")
            .set("Authorization", `Bearer ${issueToken(users.testPlayer)}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })
})

describe("Player can get player by id", function() {
    it("Player can get plaeyr by id", function(done) {
        chai.request(app)
            .get("/player/1")
            .set("Authorization", `Bearer ${issueToken(users.testPlayer)}`)
            .end(function(err, res) {
                expect(res).to.have.status(400)
                done()
            })
    })
})

// describe.skip('Player can get player by id', function () {
//     it('', function () {
//     });
// });

// describe.skip('Manager can approve additions in team ', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Manager or Admin can approve player', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Manager or Admin can delete player from team', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can delete player', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can block player', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can get all managers', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can get manager by id', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can approve manager and player', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can block manager and player', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Admin can delete manager', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Player can get all pllayers in team by id team', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Player can apply to exit in the team', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('Player can apply to switch the team', function () {
//     it('', function () {
//     });
// });
// describe.skip('Player can apply to additions in the team', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('User can registration', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('User can succesfully login with valid username and password', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('User can logout', function () {
//     it('', function () {
//     });
// });
//
// describe.skip('User can get new access token using refresh token', function () {
//     it('', function () {
//     });
// });
