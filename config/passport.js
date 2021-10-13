const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};

// for creating OAuth2.0 strategies
passport.use(User.createStrategy());

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

// < -------------  Google OAuth2.0 strategy  --------------- >
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://altcoin-charter.herokuapp.com/users/google/callback", // server port localhost:5000
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate(
        {
          email: profile.emails[0].value,
          name: profile.displayName,
          googleid: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
