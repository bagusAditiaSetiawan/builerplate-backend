const request =  require("supertest");
const app = require( "./../../app");

it("returns a 201 on success signup", async () => {
    return request(app)
        .post("/api/auth/signup")
        .send({
            email: "email@gmail.com",
            password: "email123",
        }).expect(201);
});