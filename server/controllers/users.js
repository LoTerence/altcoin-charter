const jwt = require("jsonwebtoken");
const Coin = require("../models/Coin");
const User = require("../models/User");
const keys = require("../config/keys");
const { Api401Error } = require("../utils/error-classes");

const clientURL = keys.app.clientURL;
const { secret, tokenLife } = keys.jwt;

function createToken(data) {
  return jwt.sign({ data }, secret, {
    expiresIn: tokenLife,
  });
}

// @desc Register a new user
// @route POST /users/register
// @access private - only the client can access
async function registerUser(req, res) {
  const { email, password } = req.body;
  try {
    const newUser = new User({
      email,
      password,
      watchlist: [],
      username: email,
    });
    const user = await User.addUser(newUser);

    const token = createToken({ _id: user._id });
    const profile = {
      _id: user._id,
      email: user.email,
      name: "",
    };

    return res.json({
      message: "User registered",
      profile,
      success: true,
      token: `JWT ${token}`,
    });
  } catch (err) {
    next(err);
  }
}

// @desc Log in a new user
// @route POST /users/login
// @access private - only the client can access
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Api401Error("Log in failed");
    }

    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      throw new Api401Error("Log in failed");
    }

    const token = createToken({ _id: user._id });
    const profile = {
      _id: user._id,
      email: user.email,
      name: user?.name || "",
    };

    return res.json({
      message: "User logged in",
      profile,
      success: true,
      token: `JWT ${token}`,
    });
  } catch (err) {
    next(err);
  }
}

const logOutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.json({
        message: "Failed to log user out",
        success: false,
      });
    }
  });
  return res.json({
    message: "User logged out",
    success: true,
  });
};

// @desc Get the user profile
// @route GET /users/profile
// @access private - only the client can access
const getUserProfile = async (req, res) => {
  const { _id, email, name } = req.user;
  res.json({ user: { _id, email, name } });
};

// @desc Edit the user's name
// @route PUT /users/profile/name
// @access private - only the client can access
const editUserName = async (req, res) => {
  const { newName } = req.body;
  try {
    const user = req.user;
    if (user.name === newName) {
      return res.json({
        message: "User already has the same name",
        success: false,
      });
    }
    user.name = newName;
    await user.save();
    return res.json({ message: null, name: user.name, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};

// @desc Edit the user's email
// @route PUT /users/profile/email
// @access private - only the client can access
const editUserEmail = async (req, res) => {
  if (!req.body?.password) {
    return res.json({ message: "No password!", success: false });
  }
  const { newEmail, password } = req.body;
  try {
    const user = req.user;
    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      return res.json({ message: null, success: false });
    }
    if (user.email === newEmail) {
      return res.json({
        message: "User already has the same email",
        success: false,
      });
    }
    user.email = newEmail;
    await user.save();
    return res.json({ email: user.email, message: null, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};

// @desc Edit the user's password
// @route PUT /users/password
// @access private - only the client can access
const editUserPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password) {
    return res.json({ message: "No password!", success: false });
  }
  try {
    const user = req.user;
    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      return res.json({ message: "Failed to change password", success: false });
    }
    await user.saveNewPassword(newPassword);
    return res.json({
      message: "Password successfully changed",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
};

// @desc Delete the user account by deleting the user document by id
// @route DELETE /users/delete
// @access private - only the client can access
const deleteUser = async (req, res) => {
  const password = req.body?.password;
  if (!password) {
    return res.json({ message: "No password!", success: false });
  }
  try {
    const user = req.user;
    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      return res.json({ message: "Failed to delete user", success: false });
    }
    await User.deleteOne({ _id: user._id });
    await req.logout();
    return res.json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to delete user",
      success: false,
    });
  }
};

// @desc Get the user's watchlist
// @route GET /users/watchlist
// @access private - only the client can access
const getUserWatchlist = async (req, res) => {
  try {
    const coins = await Coin.find({ _id: req.user.watchlist });
    return res.json({
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
const addCoinToWatchlist = async (req, res) => {
  const data = req.body;
  const user = req.user;
  try {
    let coin = await Coin.findOne({ symbol: data.symbol });
    if (!coin?._id) {
      coin = await Coin.create(data);
    }
    const isListed = user.watchlist.some((oid) => oid.equals(coin._id));
    if (isListed) {
      return res.json({
        error: "That coin is already on the list",
        success: false,
      });
    }
    user.watchlist.push(coin._id);
    await user.save();
    return res.json({
      data: coin,
      message: "Successfully added coin to user watchlist",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to save new coin to user watchlist",
      success: false,
    });
  }
};

// @desc Delete a coin from the user's watchlist by _id
// @route PUT /users/watchlist/delete
// @access private - only the client can access
const removeCoinFromWatchlist = async (req, res) => {
  const oid = req.body.id;
  const user = req.user;
  user.watchlist = user.watchlist.filter((id) => !id.equals(oid));
  try {
    await user.save();
    return res.json({
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
const authenticateUserGoogle = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    const token = createToken({ _id: user._id });
    return res.redirect(`${clientURL}/oauthcallback?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Auth failed", success: false });
  }
};

// Facebook login controller
const authenticateUserFacebook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    const token = createToken({ _id: user._id });
    return res.redirect(`${clientURL}/oauthcallback?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Auth failed", success: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  getUserProfile,
  editUserName,
  editUserEmail,
  editUserPassword,
  deleteUser,
  getUserWatchlist,
  addCoinToWatchlist,
  removeCoinFromWatchlist,
  authenticateUserGoogle,
  authenticateUserFacebook,
};
