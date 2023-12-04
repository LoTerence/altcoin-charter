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
      watchlist: [],
    });

    await User.addUser(newUser, (err, user) => {
      expect(user._id).toBeTruthy();
      expect(user.email).toBe(userReqBody.email);
      expect(typeof user.password).toBe("string");
      expect(user.password.length).toBeGreaterThan(10); //we should check if the password is hashed
      //   expect(user.watchlist).toEqual([]);
    });
  });

  it("throws error if email field is blank", async () => {
    const newUser = new User({
      password: "password123",
      watchlist: [],
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
      watchlist: [],
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
      watchlist: [],
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
  const addedUser1 = await User.addUser(userInstance1);
  userInstanceId = addedUser1._id.toString();
  const addedUser2 = await User.addUser(userInstance2);
  return { addedUser1, addedUser2 };
};

// example of User instance
const userInstance1 = new User({
  email: "unittest2@email.com",
  password: "anotherpassword",
  watchlist: [],
  username: "WUT",
});

// const userInstanceId = userInstance._id;

const userInstance2 = new User({
  email: "unittest3@email2.com",
  password: "someotherpassword321",
  watchlist: [],
  username: "whyDoWeNeedUsername",
});

describe("User model and services - service functions", () => {
  // beforeEach(async () => {
  //   await addUsers();
  // });

  it("can get user by id", async () => {
    const { addedUser1 } = await addUsers();

    await User.findById(addedUser1.id, (err, user) => {
      if (err) console.log("Error occured while trying to get user by id");
      if (!user) console.log("No user found");

      // expect(user._id).toBe(userInstanceId);
      expect(user.email).toBe(addedUser1.email);
    });
  });

  // it("Should return null if a document with provided ID could not be found", async () => {
  //   const result = await product.findById("1234567890123");
  //   expect(result).toBeNull();
  // });
});

// all the async function calls are throwing off the order in which these tests should be run.. need to find out how to unit test properly
// seems like mongodb-memory-server doesnt work with findbyid
