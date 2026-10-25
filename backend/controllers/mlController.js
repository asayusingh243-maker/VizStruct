
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

async function getHealth(req, res) {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        message: "ML service health check failed.",
        detail: result.detail || result,
      });
    }

    return res.status(200).json({
      message: "ML service is healthy.",
      health: result,
    });
  } catch (error) {
    console.error("ML health check error:", error.message);

    return res.status(503).json({
      message: "Unable to reach the ML service. Check that FastAPI is running.",
    });
  }
}

async function predictLearner(req, res) {
  try {
    const {
      practice_problems,
      accuracy,
      avg_attempts,
      hints_used,
      execution_errors,
      visualizations_used,
      avg_time_minutes,
    } = req.body;

    const features = {
      practice_problems,
      accuracy,
      avg_attempts,
      hints_used,
      execution_errors,
      visualizations_used,
      avg_time_minutes,
    };

    // Check that every required feature is provided.
    const missingFields = Object.entries(features)
      .filter(([, value]) => value === undefined || value === null)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required learner features.",
        missingFields,
      });
    }

    // Forward the learner data to the Python ML service.
    const response = await fetch(`${ML_SERVICE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(features),
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: "The ML service could not generate a prediction.",
        detail: result.detail || result,
      });
    }

    return res.status(200).json({
      message: "Learner prediction generated successfully.",
      prediction: result,
    });
  } catch (error) {
    console.error("ML prediction error:", error.message);

    return res.status(503).json({
      message: "Unable to reach the ML service. Check that FastAPI is running.",
    });
  }
}

module.exports = { getHealth, predictLearner };
