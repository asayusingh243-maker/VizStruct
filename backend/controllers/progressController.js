const { progressRecords, practiceProblems, diagnosticResults } = require("../data/store");

/**
 * GET /api/progress
 * Requires login.
 * Returns a simple summary of how the logged-in user is doing.
 */
function getProgress(req, res) {
  const userRecords = progressRecords.filter((p) => p.userId === req.user.id);

  const solvedCount = userRecords.filter((p) => p.status === "solved").length;
  const attemptedCount = userRecords.length;
  const totalProblems = practiceProblems.length;

  const latestDiagnostic = diagnosticResults
    .filter((r) => r.userId === req.user.id)
    .sort((a, b) => b.takenAt - a.takenAt)[0];

  res.json({
    solvedCount,
    attemptedCount,
    totalProblems,
    completionPercent:
      totalProblems === 0 ? 0 : Math.round((solvedCount / totalProblems) * 100),
    latestDiagnosticScore: latestDiagnostic ? latestDiagnostic.score : null,
    problems: userRecords, // per-problem breakdown
  });
}

module.exports = { getProgress };
