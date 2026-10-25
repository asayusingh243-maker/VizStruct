const express = require("express");
const router = express.Router();

const diagnosticController = require("../controllers/diagnosticController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/questions", diagnosticController.getQuestions);
router.post("/submit", authMiddleware, diagnosticController.submitAssessment);

module.exports = router;
