const Assessment = require("../models/Assessment");
const DiagnosticQuestion = require("../models/DiagnosticQuestion");
const User = require("../models/User");

const getQuestions = async (req, res) => {
  try {
    const questions = await DiagnosticQuestion.find({
      isActive: true,
    }).select("-correctAnswer");

    res.status(200).json(questions);
  } catch (error) {
    console.error("Get questions error:", error.message);
    res.status(500).json({
      message: "Unable to fetch assessment questions.",
    });
  }
};

const startAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.create({
      userId: req.user._id,
      status: "started",
      questions: [],
    });

    res.status(201).json({
      message: "Assessment started.",
      assessment,
    });
  } catch (error) {
    console.error("Start assessment error:", error.message);
    res.status(500).json({
      message: "Unable to start assessment.",
    });
  }
};

const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;

    const assessment = await Assessment.findOne({
      _id: assessmentId,
      userId: req.user._id,
    });

    if (!assessment) {
      return res.status(404).json({
        message: "Assessment not found.",
      });
    }

    let score = 0;
    const questions = [];

    for (const answer of answers) {
      const question = await DiagnosticQuestion.findById(answer.questionId);

      if (!question) {
        continue;
      }

      const isCorrect =
        String(answer.answer).trim().toLowerCase() ===
        String(question.correctAnswer).trim().toLowerCase();

      if (isCorrect) {
        score += 1;
      }

      questions.push({
        questionId: question._id,
        answer: answer.answer,
        isCorrect,
      });
    }

    const totalQuestions = questions.length;
    const percentage =
      totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    const strengths = [];
    const weaknesses = [];

    questions.forEach((item) => {
      if (item.isCorrect) {
        strengths.push(item.questionId);
      } else {
        weaknesses.push(item.questionId);
      }
    });

    let level = "Beginner";

    if (percentage >= 80) {
      level = "Advanced";
    } else if (percentage >= 50) {
      level = "Intermediate";
    }

    assessment.questions = questions;
    assessment.score = score;
    assessment.totalQuestions = totalQuestions;
    assessment.percentage = percentage;
    assessment.identifiedStrengths = strengths;
    assessment.identifiedWeaknesses = weaknesses;
    assessment.status = "completed";
    assessment.completedAt = new Date();

    await assessment.save();

    await User.findByIdAndUpdate(req.user._id, {
      level,
    });

    res.status(200).json({
      message: "Assessment submitted successfully.",
      assessment,
      level,
    });
  } catch (error) {
    console.error("Submit assessment error:", error.message);
    res.status(500).json({
      message: "Unable to submit assessment.",
    });
  }
};

const getAssessmentResult = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate({
      path: "questions.questionId",
      select: "-correctAnswer",
    });

    if (!assessment) {
      return res.status(404).json({
        message: "Assessment not found.",
      });
    }

    res.status(200).json(assessment);
  } catch (error) {
    console.error("Get assessment result error:", error.message);
    res.status(500).json({
      message: "Unable to fetch assessment result.",
    });
  }
};

module.exports = {
  getQuestions,
  startAssessment,
  submitAssessment,
  getAssessmentResult,
};