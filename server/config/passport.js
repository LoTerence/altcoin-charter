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
    try {
      const user = await User.findById(jwt_payload.data._id);
      if (!user) {
        return done(null, false, { message: "User id not found" });
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err, false);
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