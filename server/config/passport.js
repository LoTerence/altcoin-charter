const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
const keys = require("./keys");

const { app, jwt, google, facebook } = keys;

// < --------------- Configure passport.js strategy ------------------- >
// create OAuth2.0 strategy with passport-local-mongoose
passport.use(User.createStrategy());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: jwt.secret,
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

// < --------------- Export passport middleware ------------------- >

module.exports = async (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  await googleAuth();
  await facebookAuth();
};

// < --------------- OAuth2.0 strategies ------------------- >
const googleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: google.clientID,
          clientSecret: google.clientSecret,
          callbackURL: `${app.serverURL}/oauth/google/callback`,
        },
        (accessToken, refreshToken, profile, cb) => {
          const email = profile.emails[0].value;
          User.findOrCreate(
            {
              email,
              name: profile.displayName,
              googleid: profile.id,
              username: email,
            },
            function (err, user) {
              return cb(err, user);
            }
          );
        }
      )
    );
  } catch (err) {
    console.log("Missing google keys");
  }
};

const facebookAuth = async () => {
  try {
    passport.use(
      new FacebookStrategy(
        {
          clientID: facebook.clientID,
          clientSecret: facebook.clientSecret,
          callbackURL: `${app.serverURL}/oauth/facebook/callback`,
          profileFields: ["id", "first_name", "email"],
        },
        (accessToken, refreshToken, profile, cb) => {
          const email = profile.emails[0].value;
          User.findOrCreate(
            {
              email,
              name: profile.name.givenName,
              facebookid: profile.id,
              username: email,
            },
            function (err, user) {
              return cb(err, user);
            }
          );
        }
      )
    );
  } catch (err) {
    console.log("Missing facebook keys");
  }
};
