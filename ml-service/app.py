
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


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

CLUSTER_LABELS = {
    0: "Strong practice pattern",
    1: "Developing practice pattern",
    2: "Needs additional support",
}

app = FastAPI(
    title="VizStruct ML Service",
    description="Learner clustering API using K-Means",
    version="1.0.0",
)


class LearnerData(BaseModel):
    practice_problems: int = Field(ge=0)
    accuracy: float = Field(ge=0, le=1)
    avg_attempts: float = Field(ge=0)
    hints_used: int = Field(ge=0)
    execution_errors: int = Field(ge=0)
    visualizations_used: int = Field(ge=0)
    avg_time_minutes: float = Field(ge=0)


@app.get("/")
def home():
    return {
        "message": "VizStruct ML Service is running",
        "model": "K-Means learner clustering",
    }


@app.get("/health")
def health():
    model_path = MODEL_DIR / "learner_model.pkl"
    scaler_path = MODEL_DIR / "scaler.pkl"

    return {
        "status": "ok",
        "model_exists": model_path.exists(),
        "scaler_exists": scaler_path.exists(),
    }


@app.post("/predict")
def predict(data: LearnerData):
    model_path = MODEL_DIR / "learner_model.pkl"
    scaler_path = MODEL_DIR / "scaler.pkl"

    if not model_path.exists() or not scaler_path.exists():
        raise HTTPException(
            status_code=503,
            detail="Model files missing. Run python train.py first.",
        )

    try:
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)

        learner = pd.DataFrame(
            [[getattr(data, feature) for feature in FEATURES]],
            columns=FEATURES,
        )

        scaled_learner = scaler.transform(learner)
        cluster = int(model.predict(scaled_learner)[0])

        return {
            "cluster": cluster,
            "learner_segment": CLUSTER_LABELS.get(
                cluster, "Unclassified"
            ),
            "note": "Prototype prediction using development data.",
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}",
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=False)
