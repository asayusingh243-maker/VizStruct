# VizStruct Backend (Node.js + Express, no database)

Simple backend that matches the pages already built in the `frontend/` folder
(login, register, diagnostic test, practice problems, roadmap, progress, profile).

All data (users, progress, results) is stored **in memory** — in plain
JavaScript arrays inside `data/store.js`. Nothing is saved to disk, so
**restarting the server clears all data**. This was done on purpose since a
database wasn't wanted yet. When you're ready to add one, you only need to
change the code inside `controllers/` — the routes stay the same.

## 1. Folder structure

```
backend/
├── server.js                 # starts the app, connects everything
├── data/store.js             # the "fake database" (in-memory arrays)
├── middleware/authMiddleware.js   # checks the login token (JWT)
├── utils/generateToken.js    # creates a login token
├── controllers/               # the actual logic for each feature
└── routes/                    # maps a URL to a controller function
```

## 2. Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev        # starts on http://localhost:5000 (needs nodemon, included)
# or
npm start
```

Then open **http://localhost:5000** in your browser — you should see:
```json
{ "message": "VizStruct backend is running." }
```

## 3. Connecting the frontend

In your Next.js frontend, call this backend like:

```js
const res = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const data = await res.json();
// save data.token somewhere (e.g. localStorage) and send it back
// on protected routes as:  Authorization: Bearer <token>
```

## 4. API Endpoints

### Auth
| Method | URL | Login required? | Body |
|---|---|---|---|
| POST | `/api/auth/register` | No | `{ fullName, email, password }` |
| POST | `/api/auth/login` | No | `{ email, password }` |
| GET | `/api/auth/me` | Yes | — |

### Diagnostic test
| Method | URL | Login required? | Body |
|---|---|---|---|
| GET | `/api/diagnostic/questions` | No | — |
| POST | `/api/diagnostic/submit` | Yes | `{ answers: [{ questionId, selectedOption }] }` |

### Practice problems
| Method | URL | Login required? | Body |
|---|---|---|---|
| GET | `/api/practice/problems` | No | — |
| GET | `/api/practice/problems/:id` | No | — |
| POST | `/api/practice/problems/:id/run` | Yes | `{ code }` |
| POST | `/api/practice/problems/:id/submit` | Yes | `{ code }` |

### Roadmap / Progress / Profile
| Method | URL | Login required? | Body |
|---|---|---|---|
| GET | `/api/roadmap` | Yes | — |
| GET | `/api/progress` | Yes | — |
| GET | `/api/profile` | Yes | — |
| PUT | `/api/profile` | Yes | `{ fullName }` |

## 5. Important notes

- **No database**: everything resets when the server restarts. This is fine
  for a demo/college project; add MongoDB (or any DB) later by editing the
  `controllers/` files only.
- **Code execution is a placeholder**: safely running a student's code needs
  a separate sandboxed service (the project README mentions the Judge0 API
  for this). The `run` and `submit` routes in `practiceController.js` are
  clearly marked with comments showing exactly where to plug that in.
- **Passwords** are hashed with bcrypt before being stored — never saved as
  plain text.
- **Login tokens (JWT)** expire after 7 days (change this in
  `utils/generateToken.js`).
