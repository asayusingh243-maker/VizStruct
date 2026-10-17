const Problem = require("../models/Problem");
const ProblemProgress = require("../models/problemProgress");

const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({
      isActive: true,
    }).select(
      "title description topic difficulty languages tags"
    );

    res.status(200).json(problems);
  } catch (error) {
    console.error("Get problems error:", error.message);
    res.status(500).json({
      message: "Unable to fetch problems.",
    });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found.",
      });
    }

    const safeProblem = problem.toObject();

    safeProblem.testCases = safeProblem.testCases.filter(
      (testCase) => !testCase.isHidden
    );

    res.status(200).json(safeProblem);
  } catch (error) {
    console.error("Get problem error:", error.message);
    res.status(500).json({
      message: "Unable to fetch problem.",
    });
  }
};

const runCode = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found.",
      });
    }

    const { code } = req.body;

    if (typeof code !== "string" || !code.trim()) {
      return res.status(400).json({
        message: "code is required.",
      });
    }

    res.status(200).json({
      message:
        "Code received. Connect a sandboxed code execution service here.",
      output: "Run your code using the configured execution service.",
    });
  } catch (error) {
    console.error("Run code error:", error.message);
    res.status(500).json({
      message: "Unable to run code.",
    });
  }
};

const submitCode = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found.",
      });
    }

    const { code } = req.body;

    if (typeof code !== "string" || !code.trim()) {
      return res.status(400).json({
        message: "code is required.",
      });
    }

    const record = await ProblemProgress.findOneAndUpdate(
      {
        userId: req.user._id,
        problemId: problem._id,
      },
      {
        $set: {
          lastCode: code,
          lastActivity: new Date(),
        },
        $setOnInsert: {
          status: "attempted",
          solvedAt: null,
        },
        $inc: {
          attempts: 1,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      message:
        "Attempt saved. Connect a sandboxed code runner to evaluate test cases.",
      allPassed: false,
      progress: {
        problemId: record.problemId,
        status: record.status,
        attempts: record.attempts,
      },
    });
  } catch (error) {
    console.error("Submit code error:", error.message);
    res.status(500).json({
      message: "Unable to save practice attempt.",
    });
  }
};

module.exports = {
  getProblems,
  getProblemById,
  runCode,
  submitCode,
};