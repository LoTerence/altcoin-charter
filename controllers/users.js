const jwt = require("jsonwebtoken");
const Coin = require("../models/Coin");
const User = require("../models/User");

// @desc Register a new user
// @route POST /users/register
// @access private - only the client can access
exports.registerUser = async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    watchlist: [],
  });

  // TODO: specify unique email error instead of returning email already registered for all errors
  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        message: "Email already registered or not a real email",
      });
    } else {
      const data = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
        expiresIn: 604800, //1 week
      });
      res.json({
        success: true,
        token: "JWT " + token,
        message: "User registered",
      });
    }
  });
};

// @desc Log in a new user
// @route POST /users/authenticate
// @access private - only the client can access
exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, async (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    try {
      const isMatch = await user.isValidPassword(password);
      if (isMatch) {
        const data = {
          _id: user._id,
          email: user.email,
        };
        const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
          expiresIn: 604800, //1 week
        });

        res.json({
          success: true,
          token: "JWT " + token,
          message: "User logged in",
        });
      } else {
        return res.json({ success: false, message: "Invalid password!" });
      }
    } catch (error) {
      throw error;
    }
  });
};

// @desc Get the user profile
// @route GET /users/profile
// @access private - only the client can access
exports.getUserProfile = async (req, res) => {
  const { _id, email, name } = req.user;
  res.json({ user: { _id, email, name } });
};

// @desc Edit the user's name
// @route PUT /users/profile/name
// @access private - only the client can access
exports.editUserName = async (req, res) => {
  const newName = req.body.newName;
  User.getUserById(req.user._id, (err, user) => {
    //handle errors
    if (err) throw err;
    if (!user) {
      console.log(
        "error in server/routes/users.js -- router.put('/users/profile/name"
      );
      return res.json({ success: false, message: "User not found" });
    }

    // check if the name is the same. If it is, nothing needs to be changed
    if (user.name === newName) {
      return res.json({
        success: true,
        msg: "User already had the same name",
      });
    }

    // Change the name of the user
    user.name = newName;
    user.save((err) => {
      if (err) {
        return res.json({
          success: false,
          msg: "error changing name in routes/users.js - put(users/profile/name)",
        });
      }
      res.json({ success: true, newName: user.name });
    });
  });
};

// @desc Edit the user's email
// @route PUT /users/profile/email
// @access private - only the client can access
exports.editUserEmail = async (req, res) => {
  if (!req.body.hasOwnProperty("password")) {
    console.log("req does not have password");
    return res.json({ success: false, message: "No password!" });
  }

  const newEmail = req.body.newEmail;
  const password = req.body.password;

  User.getUserById(req.user._id, async (err, user) => {
    //handle errors
    if (err) throw err;
    if (!user) {
      console.log(
        "error in server/routes/users.js -- router.put('/users/profile/email"
      );
      return res.json({ success: false, message: "User not found" });
    }

    // Change the email of the user
    try {
      const isMatch = await user.isValidPassword(password);
      if (isMatch) {
        // check if the email is the same. If it is, nothing needs to be changed
        if (user.email === newEmail) {
          return res.json({
            success: true,
            message: "User already had the same email",
          });
        }

        // change the user's email to the new email
        user.email = newEmail;
        user.save((err) => {
          if (err) {
            return res.json({
              success: false,
              message: "Something went wrong, please try again later",
            });
          }
          return res.json({ success: true, newEmail: user.email });
        });
      } else {
        // if password does not match
        return res.json({ success: false, message: "Invalid password!" });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Something went wrong, please try again later",
      });
    }
  });
};

// @desc Edit the user's password
// @route PUT /users/password
// @access private - only the client can access
exports.editUserPassword = async (req, res) => {
  // check if req body has property for password
  if (!req.body.hasOwnProperty("password")) {
    console.log("req does not have password");
    return res.json({ success: false, message: "No password!" });
  }

  User.changeUserPassword(
    req.user._id,
    req.body.password,
    req.body.newPassword,
    (err, json) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message:
            "error editing user password in server/routes/users.js -- router.put('/users/pasword')",
        });
      }
      return res.json(json);
    }
  );
};

// @desc Delete the user account by deleting the user document by id
// @route DELETE /users/delete
// @access private - only the client can access
exports.deleteUser = async (req, res) => {
  // check if req body has property for password
  if (!req.body.hasOwnProperty("password")) {
    console.log("req does not have password");
    return res.json({ success: false, message: "No password!" });
  }

  User.deleteUserById(req.user._id, req.body.password, (err, json) => {
    if (err) {
      console.log(err);
      return res.json({
        message:
          "error deleting user in server/routes/users.js -- router.delete('/users/delete')",
        success: false,
      });
    }
    return res.json(json);
  });
};

// @desc Get the user's watchlist
// @route GET /users/watchlist
// @access private - only the client can access
exports.getUserWatchlist = async (req, res) => {
  try {
    const coins = await Coin.find({ _id: req.user.watchlist });

    return res.status(200).json({
      data: coins,
      message: "User's list of coins successfully found",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Failed to fetch data",
      success: false,
    });
  }
};

// @desc Add a coin to the user's watchlist
// @route PUT /users/watchlist/add
// @access private - only the client can access
exports.addCoinToWatchlist = async (req, res) => {
  const data = req.body.data;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error("error: User not found')");
      return res.status(200).json({ error: "User not found", success: false });
    }

    let newCoin = await Coin.findOne({ symbol: data.symbol });
    if (!newCoin?._id) {
      newCoin = await Coin.create(data);
    }

    const isListed = user.watchlist.some((oid) => oid.equals(newCoin._id));
    if (isListed) {
      return res.status(200).json({
        error: "That coin is already on the list",
        success: false,
      });
    }

    user.watchlist.push(newCoin._id);
    await user.save();

    return res.status(200).json({
      message: "Successfully added coin to user's watchlist",
      newCoin,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error saving new coin to user's watchlist",
      success: false,
    });
  }
};

// @desc Delete a coin from the user's watchlist by _id
// @route PUT /users/watchlist/delete
// @access private - only the client can access
exports.removeCoinFromWatchlist = async (req, res) => {
  const oid = req.body.id;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error("error: User not found')");
      return res.status(200).json({ error: "User not found", success: false });
    }

    user.watchlist = user.watchlist.filter((id) => !id.equals(oid));
    await user.save();

    return res.status(200).json({
      data: {},
      message: "Coin was successfully removed",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to delete coin from user watchlist",
      success: false,
    });
  }
};

// <-------------------- OAuth2.0 controllers ------------------------>
// Google login controller
exports.authenticateUserGoogle = async (req, res) => {
  User.getUserById(req.user._id, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log("no user");
      return res.json({ success: false, message: "User not found" });
    }

    const data = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: 604800, //1 week
    });

    res.redirect(process.env.CLIENT_URL + "/oauthcallback?token=" + token);
  });
};

// Facebook login controller
exports.authenticateUserFacebook = async (req, res) => {
  User.getUserById(req.user._id, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log("No user");
      return res.json({ success: false, message: "User not found" });
    }

    const data = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: 604800, //1 week
    });

    res.redirect(process.env.CLIENT_URL + "/oauthcallback?token=" + token);
  });
};
