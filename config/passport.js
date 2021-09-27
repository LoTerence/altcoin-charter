const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "User id not found" });
      }
    });
  })
);

// // TODOs: add facebook app id and secret to .env
// // TODO: fill in User.findOrCreate function
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "https://altcoin-charter.herokuapp.com/feature",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate(accessToken, function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         done(null, user);
//       });
//     }
//   )
// );

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
