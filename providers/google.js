const passport = require("passport");
const config = require("config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("providers.googleOauth20.clientId"),
      clientSecret: config.get("providers.googleOauth20.clientSecret"),
      callbackURL: `${String(
        config.get("services.userService.baseUrl")
      )}/api/v1/auth/google/callback`,
    },
    (accessToken, _refreshToken, profile, cb) => {
      return cb(null, accessToken, profile);
    }
  )
);
