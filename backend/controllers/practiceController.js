const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const ProblemProgress = require("../models/problemProgress");
const Progress = require("../models/Progress");
const ErrorLog = require("../models/ErrorLog");

const publicProblem = (problem) => {
  const obj = problem.toObject ? problem.toObject() : { ...problem };

  obj.testCases = (obj.testCases || []).map((testCase) => ({
    input: testCase.input,
    ...(testCase.isHidden ? {} : { expectedOutput: testCase.expectedOutput }),
    isHidden: testCase.isHidden,
  }));

  delete obj.solutionExplanation;
  return obj;
};

const getProblems = async (req, res) => {
  try {
    const { topic, difficulty, language } = req.query;
    const filter = { isActive: true };

    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (language) filter.languages = language;

    const problems = await Problem.find(filter)
      .select("-solutionExplanation -testCases.expectedOutput")
      .sort({ difficulty: 1, createdAt: 1 })
      .lean();

    res.json({
      success: true,
      problems,
    });
  } catch (error) {
    console.error("Get problems error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load practice problems",
    });
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.json({
      success: true,
      problem: publicProblem(problem),
    });
  } catch (error) {
    console.error("Get problem error:", error);
    res.status(400).json({
      success: false,
      message: "Invalid problem ID",
    });
  }
};

const recordSubmission = async (req, res) => {
  const { code, language = "javascript" } = req.body;

  if (!code || !String(code).trim()) {
    return res.status(400).json({
      success: false,
      message: "Code is required",
    });
  }

  const problem = await Problem.findOne({
    _id: req.params.id,
    isActive: true,
  });

  if (!problem) {
    return res.status(404).json({
      success: false,
      message: "Problem not found",
    });
  }

  const submission = await Submission.create({
    userId: req.user._id,
    problemId: problem._id,
    code: String(code),
    language: String(language),
    status: "pending",
    totalTestCases: problem.testCases.length,
  });

  await ProblemProgress.findOneAndUpdate(
    {
      userId: req.user._id,
      problemId: problem._id,
    },
    {
      $set: {
        lastCode: String(code),
        lastSubmissionId: submission._id,
        lastActivity: new Date(),
      },
      $inc: {
        attempts: 1,
      },
      $setOnInsert: {
        userId: req.user._id,
        problemId: problem._id,
        status: "attempted",
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  await Progress.findOneAndUpdate(
    { userId: req.user._id },
    {
     $inc: { totalSubmissions: 1 },
      $set: {
        lastActivity: new Date(),
      },
      $setOnInsert: {
        userId: req.user._id,
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  return submission;
};

const runProblem = async (req, res) => {
  try {
    const submission = await recordSubmission(req, res);

    if (!submission) return;

    res.json({
      success: true,
      message:
        "Submission recorded. Code execution is not connected yet; configure Judge0 to execute submissions.",
      submission: {
        id: submission._id,
        status: submission.status,
        totalTestCases: submission.totalTestCases,
        testCasesPassed: submission.testCasesPassed,
      },
    });
  } catch (error) {
    console.error("Run problem error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record code execution request",
    });
  }
};

const submitProblem = async (req, res) => {
  try {
    const submission = await recordSubmission(req, res);

    if (!submission) return;

    res.status(201).json({
      success: true,
      message:
        "Submission saved. Code execution is not connected yet; configure Judge0 before marking solutions accepted.",
      submission: {
        id: submission._id,
        status: submission.status,
        totalTestCases: submission.totalTestCases,
        testCasesPassed: submission.testCasesPassed,
      },
    });
  } catch (error) {
    console.error("Submit problem error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save submission",
    });
  }
};

module.exports = {
  getProblems,
  getProblem,
  runProblem,
  submitProblem,
};
