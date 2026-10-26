const Problem = require("../models/Problem");
const ProblemProgress = require("../models/problemProgress");
const Assessment = require("../models/Assessment");

const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progress = await ProblemProgress.find({
      userId,
    })
      .populate("problemId", "title topic difficulty")
      .sort({ lastActivity: -1 });

    const totalProblems = await Problem.countDocuments({
      isActive: true,
    });

    const solvedProblems = progress.filter(
      (item) => item.status === "solved"
    ).length;

    const attemptedProblems = progress.length;

    const totalAttempts = progress.reduce(
      (total, item) => total + item.attempts,
      0
    );

    const latestAssessment = await Assessment.findOne({
      userId,
      status: "completed",
    }).sort({ completedAt: -1 });

    res.status(200).json({
      summary: {
        totalProblems,
        attemptedProblems,
        solvedProblems,
        totalAttempts,
        accuracy:
          attemptedProblems > 0
            ? (solvedProblems / attemptedProblems) * 100
            : 0,
      },
      assessment: latestAssessment,
      problems: progress,
    });
  } catch (error) {
    console.error("Progress error:", error.message);

    res.status(500).json({
      message: "Unable to fetch progress.",
    });
  }
};

module.exports = {
  getProgress,
};