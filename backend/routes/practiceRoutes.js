const express = require("express");
const router = express.Router();

const practiceController = require("../controllers/practiceController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/problems", practiceController.getProblems);
router.get("/problems/:id", practiceController.getProblem);

router.post(
  "/problems/:id/run",
  authMiddleware,
  practiceController.runProblem
);

router.post(
  "/problems/:id/submit",
  authMiddleware,
  practiceController.submitProblem
);

module.exports = router;
