const Progress = require("../models/Progress");
const ProblemProgress = require("../models/problemProgress");
const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

const getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user._id });

    if (!progress) {
      progress = await Progress.create({ userId: req.user._id });
    }

    const problemProgress = await ProblemProgress.find({
      userId: req.user._id,
    }).lean();

    const problemIds = problemProgress.map((item) => item.problemId);

    const problems = problemIds.length
      ? await Problem.find({ _id: { $in: problemIds } })
          .select("topic")
          .lean()
      : [];

    const topicMap = new Map();

    for (const item of problemProgress) {
      const problem = problems.find(
        (candidate) => String(candidate._id) === String(item.problemId)
      );

      const topic = problem?.topic || "General";

      if (!topicMap.has(topic)) {
        topicMap.set(topic, {
          topic,
          attempted: 0,
          solved: 0,
          accuracy: 0,
        });
      }

      const stat = topicMap.get(topic);
      stat.attempted += item.attempts || 0;

      if (item.status === "solved") {
        stat.solved += 1;
      }
    }

    for (const stat of topicMap.values()) {
      stat.accuracy =
        stat.attempted > 0
          ? Math.round((stat.solved / stat.attempted) * 100)
          : 0;
    }

    const submissions = await Submission.find({
      userId: req.user._id,
    })
      .select("status")
      .lean();

    const accepted = submissions.filter(
      (submission) => submission.status === "accepted"
    ).length;

    const failed = submissions.filter((submission) =>
      [
        "wrong_answer",
        "compile_error",
        "runtime_error",
        "time_limit",
        "memory_limit",
        "error",
      ].includes(submission.status)
    ).length;

   progress.problemsAttempted = problemProgress.length;
    progress.problemsSolved = problemProgress.filter(
      (item) => item.status === "solved"
    ).length;
    progress.problemsFailed = failed;
    progress.totalSubmissions = submissions.length;
    progress.accuracy =
      submissions.length > 0
        ? Math.round((accepted / submissions.length) * 100)
        : 0;
    progress.topicProgress = [...topicMap.values()];
    progress.topicsCompleted = progress.topicProgress.filter(
      (item) => item.attempted > 0 && item.solved >= item.attempted
    ).length;
    progress.lastActivity =
      submissions.length > 0 ? new Date() : progress.lastActivity;

    await progress.save();

    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load progress",
    });
  }
};

module.exports = {
  getProgress,
};
