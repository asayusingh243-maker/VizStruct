const LearningPath = require("../models/LearningPath");
const LearnerProfile = require("../models/LearnerProfile");
const Assessment = require("../models/Assessment");

const DEFAULT_TOPICS = [
  { topic: "Programming Fundamentals", difficulty: "easy" },
  { topic: "Variables", difficulty: "easy" },
  { topic: "Conditions", difficulty: "easy" },
  { topic: "Loops", difficulty: "easy" },
  { topic: "Arrays", difficulty: "easy" },
  { topic: "Strings", difficulty: "easy" },
  { topic: "Hashing", difficulty: "medium" },
  { topic: "Recursion", difficulty: "medium" },
  { topic: "Trees", difficulty: "medium" },
  { topic: "Graphs", difficulty: "hard" },
  { topic: "Dynamic Programming", difficulty: "hard" },
];

function normalizeTopic(topic) {
  return String(topic || "").trim().toLowerCase();
}

function uniqueTopics(topics) {
  const seen = new Set();

  return topics.filter((item) => {
    const key = normalizeTopic(item.topic);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function getDefaultTopic(topicName) {
  const normalized = normalizeTopic(topicName);

  return DEFAULT_TOPICS.find(
    (item) => normalizeTopic(item.topic) === normalized
  );
}

function convertProfileTopics(
  topics,
  fallbackDifficulty = "easy"
) {
  if (!Array.isArray(topics)) {
    return [];
  }

  return topics
    .filter(
      (topic) =>
        typeof topic === "string" && topic.trim()
    )
    .map((topic) => {
      const defaultTopic = getDefaultTopic(topic);

      return {
        topic: topic.trim(),
        difficulty:
          defaultTopic?.difficulty || fallbackDifficulty,
      };
    });
}

/*
 * Get the learner's latest diagnostic strengths and weaknesses.
 *
 * We first use LearnerProfile because that is the normal
 * personalized source.
 *
 * If the profile has not been synchronized yet, we fall back
 * to the latest completed Assessment.
 */
async function getPersonalizationData(userId, profile) {
  let strengths = Array.isArray(profile?.strengths)
    ? profile.strengths
    : [];

  let weaknesses = Array.isArray(profile?.weaknesses)
    ? profile.weaknesses
    : [];

  /*
   * If the learner profile does not contain diagnostic data,
   * use the latest completed assessment.
   */
  if (strengths.length === 0 && weaknesses.length === 0) {
    const latestAssessment = await Assessment.findOne({
      userId,
      status: "completed",
    })
      .sort({
        completedAt: -1,
        createdAt: -1,
      })
      .select(
        "identifiedStrengths identifiedWeaknesses score percentage"
      )
      .lean();

    if (latestAssessment) {
      strengths = Array.isArray(
        latestAssessment.identifiedStrengths
      )
        ? latestAssessment.identifiedStrengths
        : [];

      weaknesses = Array.isArray(
        latestAssessment.identifiedWeaknesses
      )
        ? latestAssessment.identifiedWeaknesses
        : [];
    }
  }

  /*
   * Keep the learner profile synchronized with the diagnostic
   * result if the assessment contains personalization data.
   */
  if (
    strengths.length > 0 ||
    weaknesses.length > 0
  ) {
    await LearnerProfile.findOneAndUpdate(
      { userId },
      {
        $set: {
          strengths,
          weaknesses,
        },
        $setOnInsert: {
          userId,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
  }

  return {
    strengths,
    weaknesses,
  };
}

function buildPersonalizedTopics(
  strengths,
  weaknesses,
  existingPath
) {
  /*
   * Weak areas come first because they need the most attention.
   */
  const weaknessTopics = convertProfileTopics(
    weaknesses,
    "easy"
  );

  /*
   * Strong areas come next so the learner can build on
   * concepts they already understand.
   */
  const strengthTopics = convertProfileTopics(
    strengths,
    "easy"
  );

  /*
   * Add the remaining standard learning sequence.
   */
  const remainingDefaults = DEFAULT_TOPICS.filter(
    (defaultTopic) => {
      const normalizedDefault = normalizeTopic(
        defaultTopic.topic
      );

      const alreadyIncluded = [
        ...weaknessTopics,
        ...strengthTopics,
      ].some(
        (item) =>
          normalizeTopic(item.topic) ===
          normalizedDefault
      );

      return !alreadyIncluded;
    }
  );

  const orderedTopics = uniqueTopics([
    ...weaknessTopics,
    ...strengthTopics,
    ...remainingDefaults,
  ]);

  /*
   * Preserve completed topics from the existing roadmap.
   */
  const completedTopics = Array.isArray(
    existingPath?.completedTopics
  )
    ? existingPath.completedTopics
    : [];

  const completedSet = new Set(
    completedTopics
      .filter(
        (topic) =>
          typeof topic === "string" &&
          topic.trim()
      )
      .map((topic) => normalizeTopic(topic))
  );

  /*
   * Determine the status of every roadmap item.
   */
  return orderedTopics.map((item, index) => {
    const normalizedTopic = normalizeTopic(
      item.topic
    );

    const isCompleted =
      completedSet.has(normalizedTopic);

    const previousTopicsCompleted =
      orderedTopics
        .slice(0, index)
        .every((previousTopic) =>
          completedSet.has(
            normalizeTopic(previousTopic.topic)
          )
        );

    const isFirstIncomplete =
      !isCompleted && previousTopicsCompleted;

    let status = "not_started";

    if (isCompleted) {
      status = "completed";
    } else if (isFirstIncomplete) {
      status = "in_progress";
    }

    return {
      topic: item.topic,
      difficulty: item.difficulty,
      order: index + 1,
      status,
    };
  });
}

const getRoadmap = async (req, res) => {
  try {
    const userId = req.user._id;

    /*
     * Load the current user's learner profile.
     */
    const profile = await LearnerProfile.findOne({
      userId,
    }).lean();

    /*
     * Load the current user's saved roadmap.
     */
    let path = await LearningPath.findOne({
      userId,
    });

    /*
     * Get strengths/weaknesses from the learner profile,
     * with latest diagnostic assessment as a fallback.
     */
    const {
      strengths,
      weaknesses,
    } = await getPersonalizationData(
      userId,
      profile
    );

    /*
     * Build a personalized roadmap.
     */
    const personalizedTopics =
      buildPersonalizedTopics(
        strengths,
        weaknesses,
        path
      );

    /*
     * Preserve completed topics that still exist in
     * the new personalized roadmap.
     */
    const completedTopics = Array.isArray(
      path?.completedTopics
    )
      ? path.completedTopics
      : [];

    const completedSet = new Set(
      completedTopics
        .filter(
          (topic) =>
            typeof topic === "string" &&
            topic.trim()
        )
        .map((topic) => normalizeTopic(topic))
    );

    const validCompletedTopics =
      personalizedTopics
        .filter((topic) =>
          completedSet.has(
            normalizeTopic(topic.topic)
          )
        )
        .map((topic) => topic.topic);

    /*
     * The first incomplete topic is the current focus.
     */
    const currentTopic =
      personalizedTopics.find(
        (topic) =>
          topic.status === "in_progress"
      )?.topic ||
      personalizedTopics.find(
        (topic) =>
          topic.status !== "completed"
      )?.topic ||
      personalizedTopics[0]?.topic ||
      "";

    /*
     * Create the roadmap if this user does not have one.
     */
    if (!path) {
      path = await LearningPath.create({
        userId,
        topics: personalizedTopics,
        currentTopic,
        completedTopics: validCompletedTopics,
        generatedBy: "system",
        generatedAt: new Date(),
      });
    } else {
      /*
       * Update the existing roadmap with the user's
       * latest personalized diagnostic data.
       */
      path.topics = personalizedTopics;
      path.currentTopic = currentTopic;
      path.completedTopics =
        validCompletedTopics;
      path.generatedBy = "system";
      path.generatedAt = new Date();

      await path.save();
    }

    res.json({
      success: true,
      roadmap: path,

      /*
       * Return personalization information as well.
       * This allows the frontend to display the actual
       * strengths and focus areas.
       */
      personalization: {
        strengths,
        weaknesses,
      },
    });
  } catch (error) {
    console.error(
      "Get roadmap error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load roadmap",
    });
  }
};

module.exports = {
  getRoadmap,
};