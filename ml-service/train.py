
from pathlib import Path

import joblib
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler


# Paths relative to this file
BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "learner_data.csv"
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


def main():
    # 1. Load the development dataset
    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATA_PATH}"
        )

    data = pd.read_csv(DATA_PATH)

    # 2. Validate required columns
    required = ["student_id"] + FEATURES
    missing = [col for col in required if col not in data.columns]

    if missing:
        raise ValueError(
            f"Missing columns in learner_data.csv: {missing}"
        )

    if len(data) < 3:
        raise ValueError(
            "At least 3 learner records are required."
        )

    if data[FEATURES].isnull().any().any():
        raise ValueError(
            "Dataset contains missing feature values."
        )

    # 3. Scale features because they use different units
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(data[FEATURES])

    # 4. Train K-Means with 3 learner clusters
    model = KMeans(
        n_clusters=3,
        random_state=42,
        n_init=10,
    )
    data["cluster"] = model.fit_predict(scaled_features)

    # 5. Describe the clusters using their average behaviour
    summary = data.groupby("cluster")[FEATURES].mean().round(2)

    print("\nK-MEANS TRAINING COMPLETE")
    print("=" * 50)
    print(f"Learner records: {len(data)}")
    print(f"Number of clusters: {model.n_clusters}")

    print("\nCluster summary:")
    print(summary.to_string())

    print("\nLearner assignments:")
    print(data[["student_id", "cluster"]].to_string(index=False))

    # 6. Save the model and scaler
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    joblib.dump(model, MODEL_DIR / "learner_model.pkl")
    joblib.dump(scaler, MODEL_DIR / "scaler.pkl")

    # Save assignments for inspection
    data.to_csv(MODEL_DIR / "clustered_learners.csv", index=False)

    print("\nSaved files:")
    print(f"- {MODEL_DIR / 'learner_model.pkl'}")
    print(f"- {MODEL_DIR / 'scaler.pkl'}")
    print(f"- {MODEL_DIR / 'clustered_learners.csv'}")


if __name__ == "__main__":
    main()
