const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerUser,
  authenticateUser,
  getUserProfile,
  editUserName,
  editUserEmail,
  editUserPassword,
  deleteUser,
  getUserWatchlist,
  addCoinToWatchlist,
  delCoinFromWatchlist,
  authenticateUserGoogle,
  authenticateUserFacebook,
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

// edit name
router.put(
  "/profile/name",
  passport.authenticate("jwt", { session: true }),
  editUserName
);

// edit email
router.put(
  "/profile/email",
  passport.authenticate("jwt", { session: true }),
  editUserEmail
);

// edit password
router.put(
  "/password",
  passport.authenticate("jwt", { session: true }),
  editUserPassword
);

// delete account
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: true }),
  deleteUser
);

// // ----------------- Oauth 2.0 routes ------------------------------------------------///
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

// TODO: add and refine a logout function
// logout function
// router.get("/logout", (req, res) => {
//   res.redirect("http://localhost:3000");
// });

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
