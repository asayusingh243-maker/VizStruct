const express = require("express");

const {
  getProblems,
  getProblemById,
  runCode,
  submitCode,
} = require("../controllers/practiceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/problems", authMiddleware, getProblems);
router.get("/problems/:id", authMiddleware, getProblemById);
router.post("/problems/:id/run", authMiddleware, runCode);
router.post("/problems/:id/submit", authMiddleware, submitCode);

module.exports = router;