const express = require("express");
const router  = express.Router();
const { login, getMe, createAdmin } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/login",        login);
router.get("/me",    protect, getMe);

// Run once to seed the admin account (protect in production!)
router.post("/create-admin", createAdmin);

module.exports = router;
