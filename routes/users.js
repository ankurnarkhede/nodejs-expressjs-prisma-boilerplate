const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const usersController = require("../controllers/users");

router.get("/self", authenticate, usersController.getSelfData);

module.exports = router;
