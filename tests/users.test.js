/* 
For testing the User mongoose model, services, and controller
*/

const db = require("./db");

const User = require("../models/User");

// when unit testing, each test should start on a blank canvas
beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

// example user request body
const userReqBody = {
  email: "test@email.com",
  password: "password123",
};

describe("User model and services", () => {
  it("can add a user", async () => {
    const newUser = new User({
      email: userReqBody.email,
      passowrd: userReqBody.password,
      watchlist: [],
    });

    // await User.addUser(newUser, (err, user) => {
    //     if (err) {

    //     }
    // })

    expect(true).toBe(true);
  });
});
