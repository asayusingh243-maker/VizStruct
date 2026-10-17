const Progress = require("../models/Progress");
const { practiceProblems } = require("../data/seedContent");

function getProblems(req, res) {
  const list = practiceProblems.map(({ id, title, concept, difficulty, description }) => ({
    id, title, concept, difficulty, description,
  }));
  return res.json(list);
}

function getProblemById(req, res) {
  const problem = practiceProblems.find((item) => item.id === Number(req.params.id));
  if (!problem) return res.status(404).json({ message: "Problem not found." });
  return res.json(problem);
}

function runCode(req, res) {
  const problem = practiceProblems.find((item) => item.id === Number(req.params.id));
  if (!problem) return res.status(404).json({ message: "Problem not found." });

  const { code } = req.body;
  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ message: "code is required." });
  }

  // This deliberately remains a placeholder: never execute untrusted code in this API process.
  return res.json({
    message: "Code received. Connect a sandboxed code-execution service here, e.g. Judge0.",
    output: "Run your code to see the output here.",
  });
}

async function submitCode(req, res) {
  try {
    const problem = practiceProblems.find((item) => item.id === Number(req.params.id));
    if (!problem) return res.status(404).json({ message: "Problem not found." });

    const { code } = req.body;
    if (typeof code !== "string" || !code.trim()) {
      return res.status(400).json({ message: "code is required." });
    }

    // Do not report test cases as passed until a real sandbox has run them.
    const results = problem.testCases.map((testCase) => ({
      input: testCase.input,
      expected: testCase.expected,
      output: null,
      status: "not_run",
    }));

    const record = await Progress.findOneAndUpdate(
      { userId: req.user._id, problemId: problem.id },
      {
        $set: { lastCode: code },
        $setOnInsert: { status: "attempted", solvedAt: null },
        $inc: { attempts: 1 },
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.json({
      message: "Attempt saved. Connect a sandboxed code runner to evaluate test cases.",
      allPassed: false,
      results,
      progress: {
        problemId: record.problemId,
        status: record.status,
        attempts: record.attempts,
      },
    });
  } catch (error) {
    console.error("submitCode:", error);
    return res.status(500).json({ message: "Unable to save practice attempt." });
  }
}

module.exports = { getProblems, getProblemById, runCode, submitCode };
