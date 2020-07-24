const supertest = require ("supertest")
const auth = require("./auth-router")
const db = require ("../database/dbConfig")

const creds = {
    username: "karana",
    password: "andros"
}

describe("POST /register", function () {
    beforeEach(async () => {
        await db("users")
      });

    it(" should respond with 201", function (){
        return supertest (auth)
        .post("/register")
        .send(creds)
        .then(res => {
            expect(res.status).toBe(201)
        })
        .catch(err => {
            console.log(err)
        })
    })

    it("should return token", function (){
        return supertest (auth)
        .post("/register")
        .send(creds)
        .then(res => {
            expect(res.body.token).toBeTruthy()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

describe("POST /login", function () {
    beforeEach(async () => {
        await db("users")
      });

    it(" should respond with 200", function (){
        return supertest (auth)
        .post("/login")
        .send(creds)
        .then(res => {
            expect(res.status).toBe(200)
        })
        .catch(err => {
            console.log(err)
        })
    })

    it("should return token", function (){
        return supertest (auth)
        .post("/login")
        .send(creds)
        .then(res => {
            expect(res.body.token).toBeTruthy()
        })
        .catch(err => {
            console.log(err)
        })
    })
})