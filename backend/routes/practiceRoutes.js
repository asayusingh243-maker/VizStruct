const express = require("express");
const router = express.Router();
const {
  getProblems,
  getProblemById,
  runCode,
  submitCode,
} = require("../controllers/practiceController");
const protect = require("../middleware/authMiddleware");

router.get("/problems", getProblems);
router.get("/problems/:id", getProblemById);
router.post("/problems/:id/run", protect, runCode);
router.post("/problems/:id/submit", protect, submitCode);

module.exports = router;
