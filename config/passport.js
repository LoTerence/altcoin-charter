const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const FacebookStrategy = require("passport-facebook").Strategy;
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

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// < --------------- OAuth2.0 strategies ------------------- >
// < -------------  Google OAuth2.0 strategy  --------------- >
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://altcoin-charter.herokuapp.com/users/google/callback",
      // callbackURL: "http://localhost:5000/users/google/callback",
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

// < ------------ Facebook OAuth2.0 strategy ----------------- >
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        "https://altcoin-charter.herokuapp.com/users/facebook/callback",
      // callbackURL: "http://localhost:5000/users/facebook/callback",
      profileFields: ["id", "first_name", "email"],
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      User.findOrCreate(
        {
          email: profile.emails[0].value,
          name: profile.name.givenName,
          facebookid: profile.id,
        },
        function (err, user) {
          console.log(user);
          return cb(err, user);
        }
      );
    }
  )
);
