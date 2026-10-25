
from pathlib import Path

import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

FEATURES = [
    "practice_problems",
    "accuracy",
    "avg_attempts",
    "hints_used",
    "execution_errors",
    "visualizations_used",
    "avg_time_minutes",
]

# These labels are interpretations of the cluster averages
CLUSTER_LABELS = {
    0: "Strong practice pattern",
    1: "Developing practice pattern",
    2: "Needs additional support",
}


def predict_learner(
    practice_problems,
    accuracy,
    avg_attempts,
    hints_used,
    execution_errors,
    visualizations_used,
    avg_time_minutes,
):
    model = joblib.load(MODEL_DIR / "learner_model.pkl")
    scaler = joblib.load(MODEL_DIR / "scaler.pkl")

    learner = pd.DataFrame(
        [[
            practice_problems,
            accuracy,
            avg_attempts,
            hints_used,
            execution_errors,
            visualizations_used,
            avg_time_minutes,
        ]],
        columns=FEATURES,
    )

    scaled_learner = scaler.transform(learner)
    cluster = int(model.predict(scaled_learner)[0])

    return {
        "cluster": cluster,
        "learner_segment": CLUSTER_LABELS.get(
            cluster, "Unclassified"
        ),
    }


if __name__ == "__main__":
    result = predict_learner(
        practice_problems=20,
        accuracy=0.85,
        avg_attempts=1.5,
        hints_used=2,
        execution_errors=4,
        visualizations_used=15,
        avg_time_minutes=15,
    )

    print("\nNEW LEARNER PREDICTION")
    print("-" * 35)
    print(f"Cluster: {result['cluster']}")
    print(f"Segment: {result['learner_segment']}")
