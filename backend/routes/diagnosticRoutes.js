
const express = require("express");

const router = express.Router();

const diagnosticController = require("../controllers/diagnosticController");

const authMiddleware = require("../middleware/authMiddleware");

/*
 * Diagnostic questions are public because the
 * questions themselves do not contain user data.
 */
router.get(
  "/questions",
  diagnosticController.getQuestions
);

/*
 * Submitting a diagnostic requires a logged-in user.
 */
router.post(
  "/submit",
  authMiddleware,
  diagnosticController.submitAssessment
);

/*
 * Diagnostic results belong to the logged-in user,
 * so authentication is required.
 */
router.get(
  "/result",
  authMiddleware,
  diagnosticController.getLatestResult
);

module.exports = router;