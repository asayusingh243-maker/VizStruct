const express = require("express");
const router = express.Router();

const roadmapController = require("../controllers/roadmapController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, roadmapController.getRoadmap);

module.exports = router;
