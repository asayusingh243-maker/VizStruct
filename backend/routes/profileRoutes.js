
const express = require("express");

const {
  createOrUpdateProfile,
  getProfile,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrUpdateProfile);

router.get("/", protect, getProfile);

module.exports = router;