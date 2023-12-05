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
function authenticateJWT() {
  passport.authenticate("jwt", { session: true });
}

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

// -------------- login with google OAuth -----------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/signin",
  }),
  authenticateUserGoogle
);

// // ------------- login with Facebook ------------
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.CLIENT_URL + "/signin",
  }),
  authenticateUserFacebook
);

// ----------------- watchlist related functions ----------------------------------///

router.get("/watchlist", authenticateJWT(), getUserWatchlist);

router.put("/watchlist/add", authenticateJWT(), addCoinToWatchlist);

router.put("/watchlist/delete", authenticateJWT(), removeCoinFromWatchlist);

// ------------------- export router ---------------------///
module.exports = router;
