const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc Register a new user
// @route POST /users/register
// @access private - only the client can access
exports.registerUser = async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    watchList: [],
  });

  // TODO: specify unique email error instead of returning email already registered for all errors
  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        message: "Email already registered",
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
  const { _id, email, watchList } = req.user;
  res.json({ user: { _id, email, watchList } });
};

// @desc Get the user's watchlist
// @route GET /users/watchlist
// @access private - only the client can access
exports.getUserWatchlist = async (req, res) => {
  res.send(req.user.watchList);
};

// @desc Add a coin to the user's watchlist
// @route PUT /users/watchlist/addcoin
// @access private - only the client can access
exports.addCoinToWatchlist = async (req, res) => {
  const newCoin = req.body.newCoin;
  User.getUserById(req.user._id, (err, user) => {
    //handle errors
    if (err) throw err;
    if (!user) {
      console.log(
        "error in server/routes/users.js -- router.put('/watchlist/addcoin')"
      );
      return res.json({ success: false, message: "User not found" });
    }

    // Check if the coin is already in the watchlist by comparing its symbol
    if (user.watchList.filter((e) => e.Symbol === newCoin.Symbol).length) {
      return res.json({
        success: false,
        msg: "That coin is already on the list",
      });
    }

    // update watchlist with the new coin obj from req.body, then res.json the new watchlist
    user.watchList.push(newCoin);
    user.save((err) => {
      if (err)
        res.json({
          success: false,
          msg: "error saving new coin in server/routes/users.js -- router.put('/watchlist/addcoin')",
        });
      res.json({ success: true, newWatchList: user.watchList });
    });
  });
};

// @desc Delete a coin from the user's watchlist
// @route PUT /users/watchlist/delcoin
// @access private - only the client can access
exports.delCoinFromWatchlist = async (req, res) => {
  User.getUserById(req.user._id, (err, user) => {
    //handle errors
    if (err) throw err;
    if (!user) {
      console.log(
        "error in server/routes/users.js -- router.put('/watchlist/addcoin')"
      );
      return res.json({ success: false, msg: "User not found" });
    }

    user.watchList = user.watchList.filter((e) => e.Symbol !== req.body.Symbol);

    user.save((err) => {
      if (err)
        res.json({
          success: false,
          msg: "error deleting coin in routes/users.js - put(watchlist/delcoin)",
        });
      res.json({ success: true, newWatchList: user.watchList });
    });
  });
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

    res.redirect(
      "https://altcoin-charter.herokuapp.com/googlecallback?token=" + token
    ); // client port localhost:3000
  });
};
