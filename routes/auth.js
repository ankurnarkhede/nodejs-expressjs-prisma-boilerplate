const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth");

router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get("/google/callback", authController.googleAuthCallback);

module.exports = router;
