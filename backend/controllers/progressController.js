const Progress = require("../models/Progress");
const Assessment = require("../models/Assessment");
const { practiceProblems } = require("../data/seedContent");

async function getProgress(req, res) {
  try {
    const userRecords = await Progress.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .lean();

    const latestAssessment = await Assessment.findOne({
      userId: req.user._id,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .lean();

    const solvedCount = userRecords.filter(
      (item) => item.status === "solved"
    ).length;

    const attemptedCount = userRecords.length;

    const problems = userRecords.map((record) => ({
      userId: record.userId.toString(),
      problemId: record.problemId,
      status: record.status,
      attempts: record.attempts,
      lastCode: record.lastCode,
      solvedAt: record.solvedAt,
    }));

    return res.json({
      solvedCount,
      attemptedCount,
      totalProblems: practiceProblems.length,
      completionPercent:
        practiceProblems.length === 0
          ? 0
          : Math.round((solvedCount / practiceProblems.length) * 100),

      latestDiagnosticScore: latestAssessment
        ? latestAssessment.percentage
        : null,

      problems,
    });
  } catch (error) {
    console.error("getProgress:", error);
    return res.status(500).json({
      message: "Unable to load progress.",
    });
  }
}

module.exports = { getProgress };