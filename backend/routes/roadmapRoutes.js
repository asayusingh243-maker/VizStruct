const express = require("express");

const { getRoadmap } = require("../controllers/roadmapController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getRoadmap);

module.exports = router;