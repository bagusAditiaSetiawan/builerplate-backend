const request =  require("supertest");
const app = require( "./../../app");

it("returns a 201 on success signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "braditya12@gmail.com",
            password: "password",
        }).expect(201);
});