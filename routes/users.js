const { application } = require("express");
const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerUser,
  authenticateUser,
  getUserProfile,
  getUserWatchlist,
  addCoinToWatchlist,
  delCoinFromWatchlist,
} = require("../controllers/users");

// TODO: add a log out user route (maybe can be done in client)

// Register
router.post("/register", registerUser);

// Authenticate
router.post("/authenticate", authenticateUser);

// Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: true }),
  getUserProfile
);

// // ----------------- Oauth 2.0 routes ------------------------------------------------///
// // --- Facebook ---
// router.get("/auth/facebook", passport.authenticate('facebook'));
// router.get("/auth/facebook/callback", passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login'}));

// ----------------- watchlist related functions ----------------------------------///

// function that gets an array of coins (watchlist) saved by the user
router.get(
  "/watchlist",
  passport.authenticate("jwt", { session: true }),
  getUserWatchlist
);

// function that adds a new coin to watchlist
// TODO: make a service function for adding coin to user watchlist (User.addCoinToWatchList)
router.put(
  "/watchlist/addcoin",
  passport.authenticate("jwt", { session: true }),
  addCoinToWatchlist
);

// function that deletes a coin from watchlist
router.put(
  "/watchlist/delcoin",
  passport.authenticate("jwt", { session: true }),
  delCoinFromWatchlist
);

// ------------------- export router ---------------------///
module.exports = router;
