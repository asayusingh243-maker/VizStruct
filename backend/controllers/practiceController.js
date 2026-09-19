const { practiceProblems, progressRecords } = require("../data/store");

/**
 * GET /api/practice/problems
 * Returns the list of practice problems (without test case "expected"
 * answers, so students can't peek at them in the Network tab).
 */
function getProblems(req, res) {
  const list = practiceProblems.map(({ id, title, concept, difficulty, description }) => ({
    id,
    title,
    concept,
    difficulty,
    description,
  }));
  res.json(list);
}

/**
 * GET /api/practice/problems/:id
 * Returns full details for one problem (starter code, hints, public test cases).
 */
function getProblemById(req, res) {
  const problem = practiceProblems.find((p) => p.id === Number(req.params.id));
  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }
  res.json(problem);
}

/**
 * POST /api/practice/problems/:id/run
 * body: { code }
 *
 * IMPORTANT (kept simple on purpose):
 * Actually running untrusted code safely needs a separate sandboxed
 * service (the project's README mentions the Judge0 API for this).
 * Wiring that up is just an API call - to keep this backend simple
 * and safe, this route returns a placeholder response so the frontend
 * has something to work with today. Swap the inside of this function
 * for a real call to Judge0 (or any code-execution API) later.
 */
function runCode(req, res) {
  const problem = practiceProblems.find((p) => p.id === Number(req.params.id));
  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }

  const { code } = req.body;
  if (!code || !code.trim()) {
    return res.status(400).json({ message: "code is required." });
  }

  // Placeholder "execution" result. Replace with a real code runner later.
  res.json({
    message: "Code received. (Connect a real code-execution service here, e.g. Judge0.)",
    output: "Run your code to see the output here.",
  });
}

/**
 * POST /api/practice/problems/:id/submit
 * Requires login.
 * body: { code }
 *
 * Same note as runCode() above: real grading needs a real code runner.
 * For now we save the attempt and return placeholder test results so
 * the frontend flow (submit -> see results -> progress updates) works.
 */
function submitCode(req, res) {
  const problem = practiceProblems.find((p) => p.id === Number(req.params.id));
  if (!problem) {
    return res.status(404).json({ message: "Problem not found." });
  }

  const { code } = req.body;
  if (!code || !code.trim()) {
    return res.status(400).json({ message: "code is required." });
  }

  // Placeholder test results shaped exactly like the frontend expects.
  const results = problem.testCases.map((testCase) => ({
    input: testCase.input,
    expected: testCase.expected,
    output: testCase.expected, // placeholder: pretend it matched
    status: "passed",
  }));

  const allPassed = results.every((r) => r.status === "passed");

  // Save / update this user's progress on this problem.
  let record = progressRecords.find(
    (p) => p.userId === req.user.id && p.problemId === problem.id
  );

  if (!record) {
    record = {
      userId: req.user.id,
      problemId: problem.id,
      status: allPassed ? "solved" : "attempted",
      attempts: 1,
      lastCode: code,
      solvedAt: allPassed ? new Date() : null,
    };
    progressRecords.push(record);
  } else {
    record.attempts += 1;
    record.lastCode = code;
    record.status = allPassed ? "solved" : "attempted";
    if (allPassed) record.solvedAt = new Date();
  }

  res.json({
    message: allPassed ? "All test cases passed!" : "Some test cases failed.",
    allPassed,
    results,
  });
}

module.exports = { getProblems, getProblemById, runCode, submitCode };
