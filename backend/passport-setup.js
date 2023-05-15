const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "48869031313-b41pu8pvri16i1agptd7t6nhvkk6hioe.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Here you can save the user profile and access token to your database
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
