const LearningPath = require("../models/LearningPath");
const LearnerProfile = require("../models/LearnerProfile");

const DEFAULT_TOPICS = [
  { topic: "Programming Fundamentals", difficulty: "easy" },
  { topic: "Arrays", difficulty: "easy" },
  { topic: "Strings", difficulty: "easy" },
  { topic: "Hashing", difficulty: "medium" },
  { topic: "Recursion", difficulty: "medium" },
  { topic: "Trees", difficulty: "medium" },
  { topic: "Graphs", difficulty: "hard" },
  { topic: "Dynamic Programming", difficulty: "hard" },
];

const getRoadmap = async (req, res) => {
  try {
    let path = await LearningPath.findOne({ userId: req.user._id });

    if (!path) {
      const profile = await LearnerProfile.findOne({
        userId: req.user._id,
      }).lean();

      const weakTopics = profile?.weaknesses || [];

      const topics = DEFAULT_TOPICS.map((item, index) => ({
        ...item,
        order: index + 1,
        status: weakTopics.includes(item.topic)
          ? "in_progress"
          : "not_started",
      }));

      path = await LearningPath.create({
        userId: req.user._id,
        topics,
        currentTopic: topics[0]?.topic || "",
        completedTopics: [],
        generatedBy: "system",
        generatedAt: new Date(),
      });
    }

    res.json({
      success: true,
      roadmap: path,
    });
  } catch (error) {
    console.error("Get roadmap error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load roadmap",
    });
  }
};

module.exports = {
  getRoadmap,
};
