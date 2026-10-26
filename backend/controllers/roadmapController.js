const Assessment = require("../models/Assessment");

const learningPath = [
  {
    step: 1,
    concept: "Variables",
    description: "Learn how variables store and update data.",
  },
  {
    step: 2,
    concept: "Conditions",
    description: "Learn how if / elif / else control the flow of a program.",
  },
  {
    step: 3,
    concept: "Loops",
    description: "Learn how for and while loops repeat actions.",
  },
  {
    step: 4,
    concept: "Arrays",
    description: "Learn how to store and access lists of values.",
  },
  {
    step: 5,
    concept: "Functions",
    description: "Learn how to group reusable logic into functions.",
  },
];

async function getRoadmap(req, res) {
  try {
    const latestAssessment = await Assessment.findOne({
      userId: req.user._id,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .lean();

    const weakConcepts = latestAssessment
      ? latestAssessment.identifiedWeaknesses
      : [];

    const roadmap = learningPath.map((item) => ({
      ...item,
      recommended: weakConcepts.includes(item.concept),
    }));

    return res.json({
      roadmap,
      weakConcepts,
    });
  } catch (error) {
    console.error("getRoadmap:", error);
    return res.status(500).json({
      message: "Unable to load roadmap.",
    });
  }
}

module.exports = { getRoadmap };