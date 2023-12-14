const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
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
} = require("../controllers/users");

// passport middleware
const authenticateJWT = () => {
  return passport.authenticate("jwt", { session: true });
};

// <----------------------------- Routes ------------------------------------------------>
// Register
router.post("/register", registerUser);

// Log in
router.post("/login", loginUser);

// Log out
router.get("/logout", logOutUser);

// Profile
router.get("/profile", authenticateJWT(), getUserProfile);

// edit name
router.put("/profile/name", authenticateJWT(), editUserName);

// edit email
router.put("/profile/email", authenticateJWT(), editUserEmail);

// edit password
router.put("/password", authenticateJWT(), editUserPassword);

// delete account
router.delete("/delete", authenticateJWT(), deleteUser);

// ----------------- watchlist related functions ----------------------------------///
router.get("/watchlist", authenticateJWT(), getUserWatchlist);

router.put("/watchlist/add", authenticateJWT(), addCoinToWatchlist);

router.put("/watchlist/delete", authenticateJWT(), removeCoinFromWatchlist);

// ------------------- export router ---------------------///
module.exports = router;
