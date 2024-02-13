const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/health"));

module.exports = router;
