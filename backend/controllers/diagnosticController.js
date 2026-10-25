const DiagnosticQuestion = require("../models/DiagnosticQuestion");
const Assessment = require("../models/Assessment");
const DiagnosticResult = require("../models/diagnosticResult");
const LearnerProfile = require("../models/LearnerProfile");

const normalizeAnswers = (answers) => {
  if (Array.isArray(answers)) {
    return answers.reduce((map, item) => {
      const key = item.questionId || item.id;
      if (key) map[String(key)] = item.answer ?? item.selectedOption ?? "";
      return map;
    }, {});
  }

  return answers && typeof answers === "object" ? answers : {};
};

const getQuestions = async (req, res) => {
  try {
    const questions = await DiagnosticQuestion.find({ isActive: true })
      .select("question topic difficulty language options explanation")
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Get diagnostic questions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load diagnostic questions",
    });
  }
};

const submitAssessment = async (req, res) => {
  try {
    const answerMap = normalizeAnswers(req.body.answers);

    const questions = await DiagnosticQuestion.find({ isActive: true })
      .sort({ createdAt: 1 })
      .lean();

    if (!questions.length) {
      return res.status(400).json({
        success: false,
        message: "No diagnostic questions are available",
      });
    }

    let correctCount = 0;
    const answers = [];
    const topicStats = new Map();

    for (const question of questions) {
      const selectedOption = String(answerMap[String(question._id)] ?? "").trim();
      const isCorrect =
        selectedOption.toLowerCase() ===
        String(question.correctAnswer).trim().toLowerCase();

      if (isCorrect) correctCount++;

      const topic = question.topic || "General";
      if (!topicStats.has(topic)) {
        topicStats.set(topic, { correct: 0, total: 0 });
      }

      const stat = topicStats.get(topic);
      stat.total++;
      if (isCorrect) stat.correct++;

      answers.push({
        questionId: question._id,
        answer: selectedOption,
        isCorrect,
      });
    }

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const weakTopics = [...topicStats.entries()]
      .filter(([, stat]) => stat.correct / stat.total < 0.6)
      .map(([topic]) => topic);

    const strongTopics = [...topicStats.entries()]
      .filter(([, stat]) => stat.correct / stat.total >= 0.8)
      .map(([topic]) => topic);

    const assessment = await Assessment.create({
      userId: req.user._id,
      questions: answers,
      score: correctCount,
      totalQuestions,
      percentage,
      identifiedStrengths: strongTopics,
      identifiedWeaknesses: weakTopics,
      status: "completed",
      completedAt: new Date(),
    });

    // Keep the existing DiagnosticResult collection populated for compatibility
    // with the original project model. Its questionId field is numeric, so the
    // answer position is stored there rather than a MongoDB ObjectId.
    await DiagnosticResult.create({
      userId: req.user._id,
      score: percentage,
      correctCount,
      totalQuestions,
      weakConcepts: weakTopics,
      answers: questions.map((question, index) => ({
        questionId: index + 1,
        selectedOption: answers[index].answer,
        isCorrect: answers[index].isCorrect,
      })),
    });

    const skillLevel =
      percentage >= 80
        ? "advanced"
        : percentage >= 50
          ? "intermediate"
          : "beginner";

    await LearnerProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          skillLevel,
          strengths: strongTopics,
          weaknesses: weakTopics,
        },
        $setOnInsert: {
          userId: req.user._id,
        },
      },
      { upsert: true, new: true }
    );

    req.user.level =
      percentage >= 80
        ? "Advanced"
        : percentage >= 50
          ? "Intermediate"
          : "Beginner";
    await req.user.save();

    res.json({
      success: true,
      message: "Diagnostic assessment submitted successfully",
      result: {
        assessmentId: assessment._id,
        score: correctCount,
        correctCount,
        totalQuestions,
        percentage,
        strengths: strongTopics,
        weaknesses: weakTopics,
      },
    });
  } catch (error) {
    console.error("Submit diagnostic assessment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit diagnostic assessment",
    });
  }
};

module.exports = {
  getQuestions,
  submitAssessment,
};
