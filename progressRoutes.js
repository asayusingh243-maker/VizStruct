const express = require("express");
const router = express.Router();
const { getProgress } = require("../controllers/progressController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getProgress);

module.exports = router;
