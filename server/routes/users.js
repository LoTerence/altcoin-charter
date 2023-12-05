const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerUser,
  loginUser,
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

// TODO: add a log out user route (maybe can be done in client)

// Register
router.post("/register", registerUser);

// Log in
router.post("/login", loginUser);

// Log out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

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

// ----------------- watchlist related functions ----------------------------------///

router.get(
  "/watchlist",
  passport.authenticate("jwt", { session: true }),
  getUserWatchlist
);

router.put(
  "/watchlist/add",
  passport.authenticate("jwt", { session: true }),
  addCoinToWatchlist
);

router.put(
  "/watchlist/delete",
  passport.authenticate("jwt", { session: true }),
  removeCoinFromWatchlist
);

// ------------------- export router ---------------------///
module.exports = router;
