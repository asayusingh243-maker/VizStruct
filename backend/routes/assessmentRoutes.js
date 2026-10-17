const express = require("express");

const {
  getQuestions,
  startAssessment,
  submitAssessment,
  getAssessmentResult,
} = require("../controllers/assessmentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/questions", authMiddleware, getQuestions);

router.post("/start", authMiddleware, startAssessment);

router.post("/submit", authMiddleware, submitAssessment);

router.get("/result", authMiddleware, getAssessmentResult);

module.exports = router;