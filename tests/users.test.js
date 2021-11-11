/* 
For testing the User mongoose model and services
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

describe("User model and services - adding a user", () => {
  it("can add a user", async () => {
    const newUser = new User({
      email: userReqBody.email,
      password: userReqBody.password,
      watchList: [],
    });

    await User.addUser(newUser, (err, user) => {
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

    await User.addUser(newUser, (err, user) => {
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

    await User.addUser(newUser, (err, user) => {
      expect(err.message).toBe(
        "User validation failed: email: Please enter a valid email"
      );
    });
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

let userInstanceId;

const addUsers = async () => {
  const addedUser = await User.addUser(userInstance);
  userInstanceId = addedUser._id;
  await User.addUser(userInstance2);
};

// example of User instance
const userInstance = new User({
  email: "unittest2@email.com",
  password: "anotherpassword",
  watchList: [],
  username: "WUT?",
});

// const userInstanceId = userInstance._id;

const userInstance2 = new User({
  email: "unittest3@email2.com",
  password: "someotherpassword321",
  watchList: [],
  username: "whyDoWeNeedUsername",
});

describe("User model and services - service functions", () => {
  beforeEach(async () => {
    await addUsers();
  });

  // it("can get user by id", async () => {
  //   await User.getUserById(userInstanceId, (err, user) => {
  //     if (err) console.log("Error occured while trying to get user by id");
  //     if (!user) console.log("something went wrong with finding user");

  //     expect(user._id).toBe(userInstanceId);
  //     expect(user.email).toBe(userInstance.email);
  //   });
  // });

  it("can get user by email", async () => {
    await User.getUserByEmail("unittest2@email.com", (err, user) => {
      if (err) console.log("There was an error getting user by email");
      if (!user) console.log("No user found");

      expect(user.email).toBe("unittest2@email.com");
    });
  });
});

// all the async function calls are throwing off the order in which these tests should be run.. need to find out how to unit test properly
