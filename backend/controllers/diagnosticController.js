const { diagnosticQuestions, diagnosticResults, users } = require("../data/store");

/**
 * GET /api/diagnostic/questions
 * Returns the list of diagnostic questions.
 * NOTE: we remove "correctAnswer" before sending, so the frontend
 * (and a curious student in devtools) can't see the answer key.
 */
function getQuestions(req, res) {
  const questionsForClient = diagnosticQuestions.map((q) => {
    const { correctAnswer, ...safeQuestion } = q;
    return safeQuestion;
  });

  res.json(questionsForClient);
}

/**
 * POST /api/diagnostic/submit
 * Requires login.
 * body: { answers: [{ questionId: 1, selectedOption: "16" }, ...] }
 *
 * Grades the test, works out which concepts are weak,
 * and updates the user's level.
 */
function submitDiagnostic(req, res) {
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: "answers array is required." });
  }

  let correctCount = 0;
  const weakConcepts = new Set();

  answers.forEach(({ questionId, selectedOption }) => {
    const question = diagnosticQuestions.find((q) => q.id === questionId);
    if (!question) return;

    if (question.correctAnswer === selectedOption) {
      correctCount++;
    } else {
      weakConcepts.add(question.concept);
    }
  });

  const totalQuestions = diagnosticQuestions.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Very simple rule to decide the learner's level.
  let level = "Beginner";
  if (scorePercent >= 80) level = "Advanced";
  else if (scorePercent >= 50) level = "Intermediate";

  // Save the result (in memory)
  diagnosticResults.push({
    userId: req.user.id,
    score: scorePercent,
    weakConcepts: Array.from(weakConcepts),
    takenAt: new Date(),
  });

  // Update the user's level for future recommendations
  const user = users.find((u) => u.id === req.user.id);
  if (user) user.level = level;

  res.json({
    message: "Diagnostic test submitted.",
    score: scorePercent,
    correctCount,
    totalQuestions,
    weakConcepts: Array.from(weakConcepts),
    level,
  });
}

module.exports = { getQuestions, submitDiagnostic };
