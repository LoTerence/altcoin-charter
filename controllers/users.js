const jwt = require("jsonwebtoken");
const Coin = require("../models/Coin");
const User = require("../models/User");

// @desc Register a new user
// @route POST /users/register
// @access private - only the client can access
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({
      email,
      password,
      watchlist: [],
    });
    const user = await User.addUser(newUser);
    const data = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: 604800, //1 week
    });
    return res.json({
      message: "User registered",
      success: true,
      token: `JWT ${token}`,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Email already registered or not a real email",
      success: false,
    });
  }
};

// @desc Log in a new user
// @route POST /users/authenticate
// @access private - only the client can access
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      return res.json({ message: "Log in failed", success: false });
    }
    const data = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: 604800, //1 week
    });
    return res.json({
      message: "User logged in",
      success: true,
      token: `JWT ${token}`,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Failed to authenticate user",
      success: false,
    });
  }
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
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    if (user.name === newName) {
      return res.json({
        message: "User already has the same name",
        success: false,
      });
    }
    user.name = newName;
    await user.save();
    return res.json({ name: user.name, success: true });
  } catch (err) {
    console.error(err);
    return res.json({
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
    return res.json({ success: false, message: "No password!" });
  }
  const { newEmail, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      return res.json({ message: "Invalid password!", success: false });
    }
    if (user.email === newEmail) {
      return res.json({
        message: "User already has the same email",
        success: true,
      });
    }
    user.email = newEmail;
    await user.save();
    return res.json({ success: true, newEmail: user.email });
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
  if (!req.body?.password) {
    return res.json({ success: false, message: "No password!" });
  }
  try {
    const user = await User.findById(req.user._id);
    const isMatch = user.validatePassword(req.body.password);
    if (!isMatch) {
      return res.json({ message: "Invalid password!", success: false });
    }
    await user.saveNewPassword(req.body.newPassword);
    return res
      .status(200)
      .json({ message: "Password successfully changed", success: true });
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
  if (!req.body?.password) {
    return res.json({ success: false, message: "No password!" });
  }
  try {
    const user = await User.findById(id);
    const isMatch = user.validatePassword(password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password!" });
    }
    await User.deleteOne({ _id: id });
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
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error("error: User not found')");
      return res.json({ error: "User not found", success: false });
    }
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
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error("error: User not found')");
      return res.json({ error: "User not found", success: false });
    }
    user.watchlist = user.watchlist.filter((id) => !id.equals(oid));
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
    const data = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: 604800, //1 week
    });
    return res.redirect(
      process.env.CLIENT_URL + "/oauthcallback?token=" + token
    );
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
    return res.redirect(
      process.env.CLIENT_URL + "/oauthcallback?token=" + token
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Auth failed", success: false });
  }
};

module.exports = {
  registerUser,
  authenticateUser,
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
