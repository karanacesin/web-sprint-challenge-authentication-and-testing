const supertest = require ("supertest")
const jokes = require("./jokes-router")
const db = require ("../database/dbConfig")
const { response } = require("../api/server")

const creds = {
    username: "karana",
    password: "andros"
}

describe("GET /", function () {
    beforeEach(async () => {
        await db("users")
      });

    it(" should respond with 200", function (){
        return supertest (jokes)
        .get("/")
        .auth (creds)
        .expect(200)
    })

    it("should return data", function (){
        return supertest (jokes)
        .get("https://icanhazdadjoke.com/search")
        .expect(response.data).toBe(response.data)
    })
})