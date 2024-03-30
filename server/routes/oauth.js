const passport = require("passport");
const router = require("express").Router();
const clientURL = require("../config/keys").app.clientURL;

const {
  authenticateUserGoogle,
  authenticateUserFacebook,
} = require("../controllers/users");

// -------------- login with google OAuth -----------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${clientURL}/signin`,
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
    failureRedirect: `${clientURL}/signin`,
  }),
  authenticateUserFacebook
);

module.exports = router;
