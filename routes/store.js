const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const storeController = require("../controllers/store");
const { ensureAuth } = require("../middleware/auth");

// Store Routes


module.exports = router;
