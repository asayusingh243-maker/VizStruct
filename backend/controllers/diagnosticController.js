const DiagnosticResult = require("../models/diagnosticResult");
const User = require("../models/User");
const { diagnosticQuestions } = require("../data/seedContent");

function getQuestions(req, res) {
  const questionsForClient = diagnosticQuestions.map(({ correctAnswer, ...safeQuestion }) => safeQuestion);
  return res.json(questionsForClient);
}

async function submitDiagnostic(req, res) {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "answers array is required." });
    }

    // Accept each known question at most once; ignore unknown question IDs.
    const answerByQuestion = new Map();
    for (const answer of answers) {
      if (!answer || !Number.isInteger(Number(answer.questionId))) continue;
      const questionId = Number(answer.questionId);
      if (
        diagnosticQuestions.some((question) => question.id === questionId) &&
        !answerByQuestion.has(questionId)
      ) {
        answerByQuestion.set(questionId, typeof answer.selectedOption === "string" ? answer.selectedOption : "");
      }
    }
    if (answerByQuestion.size === 0) {
      return res.status(400).json({ message: "No valid question answers were provided." });
    }

    let correctCount = 0;
    const weakConcepts = new Set();
    const storedAnswers = [];

    for (const question of diagnosticQuestions) {
      // Grade against the full test so omitted questions count as unanswered/incorrect.
      const selectedOption = answerByQuestion.get(question.id) || "";
      const isCorrect = question.correctAnswer === selectedOption;
      if (isCorrect) correctCount++;
      else weakConcepts.add(question.concept);
      if (answerByQuestion.has(question.id)) {
        storedAnswers.push({ questionId: question.id, selectedOption, isCorrect });
      }
    }

    const totalQuestions = diagnosticQuestions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    let level = "Beginner";
    if (score >= 80) level = "Advanced";
    else if (score >= 50) level = "Intermediate";

    await DiagnosticResult.create({
      userId: req.user._id,
      score,
      correctCount,
      totalQuestions,
      weakConcepts: Array.from(weakConcepts),
      answers: storedAnswers,
    });
    await User.findByIdAndUpdate(req.user._id, { level });

    return res.json({
      message: "Diagnostic test submitted.",
      score,
      correctCount,
      totalQuestions,
      weakConcepts: Array.from(weakConcepts),
      level,
    });
  } catch (error) {
    console.error("submitDiagnostic:", error);
    return res.status(500).json({ message: "Unable to save diagnostic results." });
  }
}

module.exports = { getQuestions, submitDiagnostic };
