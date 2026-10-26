const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const ProblemProgress = require("../models/problemProgress");
const {
  executeTestCases,
  LANGUAGE_IDS,
  mapSubmissionStatus,
} = require("../services/judge0Service");

const MAX_CODE_LENGTH = 50000;
const MAX_TEST_CASES = 50;

function validateExecutionRequest(req, res, problem) {
  const { code, language = "Python" } = req.body || {};

  if (typeof code !== "string" || !code.trim()) {
    res.status(400).json({ message: "code is required." });
    return null;
  }
  if (code.length > MAX_CODE_LENGTH) {
    res.status(400).json({ message: "Code must be 50,000 characters or fewer." });
    return null;
  }
  if (
    typeof language !== "string" ||
    !Object.prototype.hasOwnProperty.call(
      LANGUAGE_IDS,
      language.toLowerCase()
    )
  ) {
    res.status(400).json({ message: "A supported language is required." });
    return null;
  }
  if (
    problem.languages.length &&
    !problem.languages.some(
      (supportedLanguage) =>
        supportedLanguage.toLowerCase() === language.toLowerCase()
    )
  ) {
    res.status(400).json({
      message: `${language} is not supported for this problem.`,
    });
    return null;
  }

  const testCases = problem.testCases || [];
  if (
    testCases.length === 0 ||
    testCases.length > MAX_TEST_CASES ||
    testCases.some(
      (testCase) =>
        testCase.input.length > 10000 ||
        testCase.expectedOutput.length > 10000
    )
  ) {
    res.status(400).json({
      message: "Problem test cases are missing or exceed execution limits.",
    });
    return null;
  }

  return { code, language, testCases };
}

function formatResults(results, allTestCases) {
  return results.map((result) => {
    const testCase = allTestCases[result.index];
    const visible = !testCase.isHidden;

    return {
      testCase: result.index + 1,
      passed: result.passed,
      status: result.status,
      ...(visible
        ? {
            input: result.input,
            expected: result.expectedOutput,
            output: result.output,
          }
        : {}),
      ...(visible && result.errorOutput
        ? { error: result.errorOutput }
        : {}),
      time: result.time,
      memory: result.memory,
    };
  });
}

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

    const request = validateExecutionRequest(req, res, problem);
    if (!request) return;
    const visibleCases = request.testCases.filter(
      (testCase) => !testCase.isHidden
    );
    if (!visibleCases.length) {
      return res.status(400).json({
        message: "This problem has no visible test cases to run.",
      });
    }

    const results = await executeTestCases(
      request.code,
      request.language,
      visibleCases
    );
    const formattedResults = results.map((result, index) => ({
      testCase: index + 1,
      passed: result.passed,
      status: result.status,
      input: result.input,
      expected: result.expectedOutput,
      output: result.output,
      ...(result.errorOutput ? { error: result.errorOutput } : {}),
      time: result.time,
      memory: result.memory,
    }));

    res.status(200).json({
      message: "Code executed.",
      allPassed: results.length === visibleCases.length && results.every((result) => result.passed),
      passed: results.filter((result) => result.passed).length,
      total: visibleCases.length,
      results: formattedResults,
    });
  } catch (error) {
    console.error("Run code error:", error);
    res.status(500).json({
      message: "Unable to run code with Judge0.",
      error: error.message,
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

    const request = validateExecutionRequest(req, res, problem);
    if (!request) return;

    const results = await executeTestCases(
      request.code,
      request.language,
      request.testCases
    );
    const testCasesPassed = results.filter((result) => result.passed).length;
    const allPassed =
      results.length === request.testCases.length &&
      results.every((result) => result.passed);
    const lastResult = results[results.length - 1];
    const evaluatedResult =
      results.find((result) => !result.passed) || lastResult;
    const status = allPassed
      ? "accepted"
      : mapSubmissionStatus(evaluatedResult);
    const output = evaluatedResult?.output || "";
    const existingProgress = await ProblemProgress.findOne({
      userId: req.user._id,
      problemId: problem._id,
    });
    const solvedAt = allPassed
      ? new Date()
      : existingProgress?.solvedAt || null;
    const submission = await Submission.create({
      userId: req.user._id,
      problemId: problem._id,
      code: request.code,
      language: request.language,
      status,
      executionTime: results.reduce((sum, result) => sum + result.time, 0),
      memoryUsed: Math.max(...results.map((result) => result.memory), 0),
      output,
      errorMessage: evaluatedResult?.errorOutput || "",
      testCasesPassed,
      totalTestCases: request.testCases.length,
      judge0SubmissionId: results[0]?.token || null,
    });

    const record = await ProblemProgress.findOneAndUpdate(
      {
        userId: req.user._id,
        problemId: problem._id,
      },
      {
        $set: {
          lastCode: request.code,
          lastSubmissionId: submission._id,
          lastActivity: new Date(),
          status: allPassed || existingProgress?.status === "solved"
            ? "solved"
            : "attempted",
          solvedAt,
        },
        $setOnInsert: {
          userId: req.user._id,
          problemId: problem._id,
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
      message: allPassed
        ? "All test cases passed."
        : "Some test cases did not pass.",
      status,
      allPassed,
      passed: testCasesPassed,
      total: request.testCases.length,
      results: formatResults(results, request.testCases),
      progress: {
        problemId: record.problemId,
        status: record.status,
        attempts: record.attempts,
      },
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("Submit code error:", error);
    res.status(500).json({
      message: "Unable to evaluate and save practice attempt.",
      error: error.message,
    });
  }
};

module.exports = {
  getProblems,
  getProblemById,
  runCode,
  submitCode,
};