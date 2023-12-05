const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// for creating OAuth2.0 strategies
// this is using passport-local-mongoose
passport.use(User.createStrategy());

const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.data._id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        done(null, user);
      })
      .catch((err) => done(err, false));
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

// < --------------- OAuth2.0 strategies ------------------- >
// < -------------  Google OAuth2.0 strategy  --------------- >
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SERVER_URL + "/users/google/callback",
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
      callbackURL: process.env.SERVER_URL + "/users/facebook/callback",
      profileFields: ["id", "first_name", "email"],
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate(
        {
          email: profile.emails[0].value,
          name: profile.name.givenName,
          facebookid: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
