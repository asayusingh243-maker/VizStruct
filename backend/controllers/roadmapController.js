const { diagnosticResults } = require("../data/store");

/**
 * A fixed learning path. In a bigger version of this project,
 * you'd generate this dynamically from the user's weak concepts.
 * Kept simple here on purpose.
 */
const learningPath = [
  { step: 1, concept: "Variables", description: "Learn how variables store and update data." },
  { step: 2, concept: "Conditions", description: "Learn how if / elif / else control the flow of a program." },
  { step: 3, concept: "Loops", description: "Learn how for and while loops repeat actions." },
  { step: 4, concept: "Arrays", description: "Learn how to store and access lists of values." },
  { step: 5, concept: "Functions", description: "Learn how to group reusable logic into functions." },
];

/**
 * GET /api/roadmap
 * Requires login.
 * Returns the learning path, marking the concepts the user
 * struggled with in their latest diagnostic test (if any).
 */
function getRoadmap(req, res) {
  const userResults = diagnosticResults
    .filter((r) => r.userId === req.user.id)
    .sort((a, b) => b.takenAt - a.takenAt);

  const latestResult = userResults[0];
  const weakConcepts = latestResult ? latestResult.weakConcepts : [];

  const roadmap = learningPath.map((item) => ({
    ...item,
    recommended: weakConcepts.includes(item.concept),
  }));

  res.json({ roadmap, weakConcepts });
}

module.exports = { getRoadmap };
