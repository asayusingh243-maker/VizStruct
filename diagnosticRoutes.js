const express = require("express");
const router = express.Router();
const { getQuestions, submitDiagnostic } = require("../controllers/diagnosticController");
const protect = require("../middleware/authMiddleware");

router.get("/questions", getQuestions);
router.post("/submit", protect, submitDiagnostic);

module.exports = router;
