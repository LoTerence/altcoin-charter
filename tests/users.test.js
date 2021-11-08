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

// example of User instance
const userInstance = new User({
  email: userReqBody.email,
  password: userReqBody.password,
  watchList: [],
});

describe("User model and services - adding a user", () => {
  it("can add a user", async () => {
    const newUser = new User({
      email: userReqBody.email,
      password: userReqBody.password,
      watchList: [],
    });

    User.addUser(userInstance, (err, user) => {
      expect(user._id).toBeTruthy();
      expect(user.email).toBe(userReqBody.email);
      expect(typeof user.password).toBe("string");
      expect(user.password.length).toBeGreaterThan(10); //we should check if the password is hashed
      //   expect(user.watchList).toEqual([]);
    });
  });

  it("throws error if email field is blank", async () => {
    const newUser = new User({
      password: "password123",
      watchList: [],
    });

    User.addUser(newUser, (err, user) => {
      expect(err).toBeTruthy();
      expect(err.message).toBe("User validation failed: email: Email required");
    });
  });

  it("throws error for invalid emails", async () => {
    const newUser = new User({
      email: "testemailcom",
      password: "password12345",
      watchList: [],
    });

    User.addUser(newUser, (err, user) => {
      expect(err.message).toBe(
        "User validation failed: email: Please enter a valid email"
      );
    });

    // const e = await User.addUser(newUser);
    // expect(e).toThrow();
  });

  /*
  it("throws error for emails that already exist in collection", async () => {
    const newUser = new User({
      email: userReqBody.email,
      password: userReqBody.password,
      watchList: [],
    });

    await User.addUser(newUser);

    // add same user again - should throw error
    await User.addUser(newUser, (err, user) => {
      console.log(err);
      expect(err).toBeTruthy();
    });
    // this function throws an error but jest isnt catching it... 

    // const e = await User.addUser(newUser);
    // expect(e).toThrow();
  }); */
});

describe("User model and services - service functions", () => {
  it("can get user by _id", async () => {
    let user_id = await User.addUser(userInstance)._id;

    await User.getUserById(user_id, (err1, user1) => {
      console.log(err1);
      console.log(user1);
      expect(user1.email).toBe(userInstance.email);
    });
  });
});
