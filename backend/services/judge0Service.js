const LANGUAGE_IDS = {
  python: 71,
  javascript: 63,
  "c++": 54,
  java: 62,
};

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  const apiKey = process.env.JUDGE0_API_KEY;

  if (apiKey) {
    headers["X-Auth-Token"] = apiKey;
  }

  if (process.env.JUDGE0_RAPIDAPI_KEY) {
    headers["X-RapidAPI-Key"] = process.env.JUDGE0_RAPIDAPI_KEY;
    headers["X-RapidAPI-Host"] =
      process.env.JUDGE0_RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com";
  }

  return headers;
}

async function requestJudge0(path, options = {}) {
  const baseUrl = (process.env.JUDGE0_BASE_URL || "https://ce.judge0.com").replace(
    /\/+$/,
    ""
  );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: { ...getHeaders(), ...options.headers },
      signal: controller.signal,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `Judge0 returned ${response.status}${message ? `: ${message}` : "."}`
      );
    }

    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Judge0 request timed out.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeOutput(value) {
  return (value || "").replace(/\r\n/g, "\n").trim();
}

async function runTestCase(code, language, input) {
  const languageKey = language.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(LANGUAGE_IDS, languageKey)) {
    throw new Error(`The ${language} language is not supported by Judge0.`);
  }
  const languageId = LANGUAGE_IDS[languageKey];

  const created = await requestJudge0(
    "/submissions?base64_encoded=false&wait=false",
    {
      method: "POST",
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input,
        cpu_time_limit: 2,
        wall_time_limit: 5,
        memory_limit: 128000,
      }),
    }
  );

  if (!created.token) {
    throw new Error("Judge0 did not return a submission token.");
  }

  const deadline = Date.now() + 25000;
  let result;

  while (Date.now() < deadline) {
    await sleep(1000);
    result = await requestJudge0(
      `/submissions/${encodeURIComponent(created.token)}?base64_encoded=false`
    );

    if (!result.status || result.status.id > 2) {
      return {
        token: created.token,
        status: result.status?.description || "Judge Error",
        statusId: result.status?.id || 10,
        output: result.stdout || "",
        errorOutput: result.compile_output || result.stderr || "",
        time: Number(result.time) || 0,
        memory: Number(result.memory) || 0,
      };
    }
  }

  throw new Error("Judge0 did not finish execution before the timeout.");
}

async function executeTestCases(code, language, testCases) {
  const results = [];

  for (const [index, testCase] of testCases.entries()) {
    const execution = await runTestCase(code, language, testCase.input);
    const passed =
      execution.statusId === 3 &&
      normalizeOutput(execution.output) ===
        normalizeOutput(testCase.expectedOutput);

    results.push({
      index,
      passed,
      statusId: execution.statusId,
      status:
        execution.statusId === 3 && !passed
          ? "Wrong Answer"
          : execution.status,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      output: execution.output,
      errorOutput: execution.errorOutput,
      time: execution.time,
      memory: execution.memory,
      token: execution.token,
    });

    if (execution.statusId !== 3) {
      break;
    }
  }

  return results;
}

function mapSubmissionStatus(result) {
  if (result.passed) {
    return "accepted";
  }

  if (result.statusId === 4 || result.status === "Wrong Answer") {
    return "wrong_answer";
  }
  if (result.statusId === 5 || result.status === "Time Limit Exceeded") {
    return "time_limit";
  }
  if (result.statusId === 6 || result.status === "Compilation Error") {
    return "compile_error";
  }
  if ([7, 8, 9, 11, 12].includes(result.statusId)) {
    return "runtime_error";
  }
  return "error";
}

module.exports = {
  executeTestCases,
  LANGUAGE_IDS,
  mapSubmissionStatus,
};
