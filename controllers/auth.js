const passport = require("passport");
const authService = require("../services/authService");
const logger = require("../utils/logger");

/**
 * Fetches the user info from Google and authenticates User
 *
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express middleware function
 */
const googleAuthCallback = (req, res, next) => {
  const uiServiceUrl = new URL(config.get("services.uiService.baseUrl"));

  try {
    return passport.authenticate("google", {}, async (err, _, user) => {
      if (err) {
        logger.error(err);
        return res.boom.unauthorized("User cannot be authenticated");
      }

      const userData = await authService.loginOrSignupWithGoogle(user._json);

      const token = authService.generateAuthToken({ userId: userData?.id });

      // respond with a cookie
      res.cookie(config.get("userAccessToken.cookieName"), token, {
        domain: uiServiceUrl.hostname,
        expires: new Date(
          Date.now() + config.get("userAccessToken.ttl") * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      return res.redirect(uiServiceUrl.href);
    })(req, res, next);
  } catch (err) {
    logger.error(err);

    // Redirect to an error page in case of an error
    return res.redirect(uiServiceUrl.href);
  }
};

// Logs out the user from the device
const logOut = (_req, res) => {
  const cookieName = config.get("userAccessToken.cookieName");
  const rCalUiUrl = new URL(config.get("services.uiService.baseUrl"));

  res.clearCookie(cookieName, {
    domain: rCalUiUrl.hostname,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res.json({
    message: "SignOut successful",
  });
};

module.exports = { googleAuthCallback, logOut };
