# VizStruct

VizStruct is a learning platform for programming practice. It includes a
Next.js frontend, an Express API backed by MongoDB, and a Python ML service
that groups learner activity into practice-pattern segments.

## Features

- Learner registration, login, and profile management
- Diagnostic assessments and personalized progress views
- Practice problems, learning paths, and progress tracking
- K-Means learner clustering exposed through the ML API

The ML model is a prototype trained on the development dataset in
`ml-service/data/learner_data.csv`. Diagnostic predictions currently use
derived activity metrics rather than a learner's complete long-term history.

## Project structure

```text
backend/       Express API, MongoDB models, and API routes
frontend/      Next.js application
ml-service/    FastAPI prediction API, training script, and model artifacts
```

## Requirements

- Node.js and npm
- Python 3.10 or later
- MongoDB connection string (for example, a MongoDB Atlas URI)

## Run locally

Run each service in a separate terminal from the repository root.

### 1. Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set `MONGODB_URI` and `JWT_SECRET` in `backend/.env`. Keep this file private;
it is excluded from Git.

```powershell
npm run dev
```

The API starts at `http://localhost:5000`.

### 2. ML service

```powershell
cd ml-service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

The repository includes trained model artifacts in `ml-service/models/`. To
retrain the model from the development dataset, run `python train.py`.

```powershell
python app.py
```

The ML API starts at `http://127.0.0.1:8000`. Its interactive API docs are at
`http://127.0.0.1:8000/docs`.

### 3. Frontend

```powershell
cd frontend
npm install
```

Create `frontend/.env.local` with the backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then start the development server:

```powershell
npm run dev
```

Open `http://localhost:3000`.

## ML API

The backend proxies ML requests at:

- `GET /api/ml/health` — checks the ML service and model artifacts
- `POST /api/ml/predict` — returns a learner cluster and segment

The prediction request requires these numeric fields:

```json
{
  "practice_problems": 20,
  "accuracy": 0.85,
  "avg_attempts": 1.5,
  "hints_used": 2,
  "execution_errors": 4,
  "visualizations_used": 15,
  "avg_time_minutes": 15
}
```

The service validates that counts and durations are non-negative and that
`accuracy` is between `0` and `1`.

## Configuration and secrets

Backend configuration is documented in `backend/.env.example`. Do not commit
`.env` files, database credentials, or signing secrets. The frontend API URL is
configured through `NEXT_PUBLIC_API_URL`.
