const Assessment = require("../models/Assessment");
const DiagnosticQuestion = require("../models/DiagnosticQuestion");
const User = require("../models/User");


const getQuestions = async (req, res) => {
  try {
    const questions = await DiagnosticQuestion.find({
      isActive: true,
    }).select("-correctAnswer");

    res.status(200).json({
      message: "Diagnostic questions fetched successfully",
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch diagnostic questions",
      error: error.message,
    });
  }
};


const startAssessment = async (req, res) => {
  try {
    const questions = await DiagnosticQuestion.find({
      isActive: true,
    }).select("_id question topic difficulty language options");

    if (questions.length === 0) {
      return res.status(404).json({
        message: "No diagnostic questions available",
      });
    }

    const assessment = await Assessment.create({
      userId: req.user._id,
      questions: questions.map((question) => ({
        questionId: question._id,
        answer: "",
        isCorrect: false,
      })),
      totalQuestions: questions.length,
      score: 0,
      percentage: 0,
      status: "started",
    });

    res.status(201).json({
      message: "Assessment started successfully",
      assessmentId: assessment._id,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to start assessment",
      error: error.message,
    });
  }
};


const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;

    if (!assessmentId || !answers) {
      return res.status(400).json({
        message: "assessmentId and answers are required",
      });
    }

    const assessment = await Assessment.findOne({
      _id: assessmentId,
      userId: req.user._id,
    });

    if (!assessment) {
      return res.status(404).json({
        message: "Assessment not found",
      });
    }

    if (assessment.status === "completed") {
      return res.status(400).json({
        message: "Assessment has already been completed",
      });
    }

    let score = 0;
    const strengths = [];
    const weaknesses = [];

    for (const item of assessment.questions) {
      const question = await DiagnosticQuestion.findById(item.questionId);

      if (!question) {
        continue;
      }

      const userAnswer = answers[item.questionId.toString()] || "";

      item.answer = userAnswer;

      const isCorrect =
        userAnswer.trim().toLowerCase() ===
        question.correctAnswer.trim().toLowerCase();

      item.isCorrect = isCorrect;

      if (isCorrect) {
        score++;
        strengths.push(question.topic);
      } else {
        weaknesses.push(question.topic);
      }
    }

    const totalQuestions = assessment.questions.length;

    const percentage =
      totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;
        let level = "Beginner";

if (percentage >= 80) {
  level = "Advanced";
} else if (percentage >= 50) {
  level = "Intermediate";
}

await User.findByIdAndUpdate(req.user._id, { level });

    assessment.score = score;
    assessment.totalQuestions = totalQuestions;
    assessment.percentage = percentage;
    assessment.identifiedStrengths = [...new Set(strengths)];
    assessment.identifiedWeaknesses = [...new Set(weaknesses)];
    assessment.status = "completed";
    assessment.completedAt = new Date();

    await assessment.save();

    res.status(200).json({
      message: "Assessment submitted successfully",
      result: {
        score,
        totalQuestions,
        percentage,
        level,
        identifiedStrengths: assessment.identifiedStrengths,
        identifiedWeaknesses: assessment.identifiedWeaknesses,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit assessment",
      error: error.message,
    });
  }
};


const getAssessmentResult = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      userId: req.user._id,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .populate("questions.questionId");

    if (!assessment) {
      return res.status(404).json({
        message: "No completed assessment found",
      });
    }

    res.status(200).json({
      message: "Assessment result fetched successfully",
      assessment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch assessment result",
      error: error.message,
    });
  }
};

module.exports = {
  getQuestions,
  startAssessment,
  submitAssessment,
  getAssessmentResult,
};