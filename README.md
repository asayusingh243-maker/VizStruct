# 🧠 VizStruct

### *Visualize. Understand. Master.*

> **An Intelligent & Personalized Coding Learning Platform** designed to help students not only *solve* code, but actually **understand how it works**.

---

## 📌 About VizStruct

Most coding platforms tell learners whether their solution is **correct or incorrect**.

But for beginners, the bigger questions are:

* Why is my logic wrong?
* What happens during each iteration of a loop?
* How are variables changing while my program runs?
* Which programming concepts am I weak in?
* What should I practice next?

**VizStruct** aims to answer these questions.

It is an intelligent coding-learning platform that combines **personalized learning, coding practice, step-by-step execution visualization, misconception detection, and adaptive recommendations** to create a more effective learning experience.

---

## 🎯 Problem Statement

Beginners need more than just solving programming questions—they need to understand **code execution** and the reasons behind their logical errors.

Many existing coding platforms primarily focus on evaluating the final output and often lack:

* Personalized learning paths
* Step-by-step execution visualization
* Detailed error explanations
* Misconception detection
* Targeted recovery exercises

As a result, learners may repeatedly make the same mistakes without understanding the underlying concepts.

**VizStruct bridges this gap by focusing on both code correctness and conceptual understanding.**

---

## ✨ Key Features

### 🧩 Personalized Learning

Creates a learning path according to the learner's current programming knowledge and skill level.

### 📝 Diagnostic Assessment

Uses an initial questionnaire and diagnostic test to identify the learner's strengths and knowledge gaps.

### 💻 Coding Practice

Provides coding problems according to the learner's current level and progress.

### 👁️ Step-by-Step Code Visualization

Visualizes program execution to help students understand loops, variables, arrays, conditions, and other programming concepts.

### 🔍 Error & Misconception Detection

Analyzes submitted solutions to identify logical errors and possible conceptual misunderstandings.

### 💡 Personalized Feedback & Recovery

Provides targeted feedback and recovery exercises based on detected weaknesses.

### 📊 Progress Tracking

Tracks learner performance, completed problems, strengths, weaknesses, and improvement over time.

### 🔄 Adaptive Recommendations

Continuously updates future problem recommendations according to the learner's performance.

---

## 🔁 Learning Cycle

VizStruct follows a continuous adaptive learning cycle:

```text
ASSESS
   ↓
RECOMMEND
   ↓
EXECUTE
   ↓
VISUALIZE
   ↓
DIAGNOSE
   ↓
RECOVER
   ↓
RE-ASSESS
   ↺
```

The goal is to ensure that every coding attempt contributes to the learner's next personalized recommendation.

---

## ⚙️ How VizStruct Works

```text
Start
  │
  ▼
User Registration / Login
  │
  ▼
Learner Profile & Skill Assessment
  │
  ▼
Questionnaire & Diagnostic Test
  │
  ▼
Personalized Learning Path Generation
  │
  ▼
Coding Problem Recommendation
  │
  ▼
Code Submission & Execution
  │
  ▼
Step-by-Step Code Visualization
  │
  ▼
Error & Misconception Detection
  │
  ▼
Personalized Feedback & Recovery
  │
  ▼
Progress Tracking & Analytics
  │
  ▼
Performance Evaluation
  │
  ▼
Updated Learning Recommendations
  │
  ▼
Next Coding Problem
  ↺
```

---

## 🛠️ Technology Stack

### 🎨 Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### ⚙️ Backend

* Node.js
* Express.js

### 🧠 Analysis

* Python
* FastAPI

### ▶️ Code Execution

* Judge0 API

### 🗄️ Database

* MongoDB Atlas

### 🔐 Authentication

* JSON Web Token (JWT)
* bcrypt

### 🧰 Development Tools

* Visual Studio Code
* Git
* GitHub

---

## 🏗️ Proposed Architecture

```text
                  ┌──────────────────────┐
                  │       Student        │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Next.js Frontend   │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Node.js / Express API│
                  └─────┬─────────┬──────┘
                        │         │
              ┌─────────▼───┐ ┌──▼────────────┐
              │ MongoDB     │ │ Code Execution│
              │ Atlas       │ │    Engine     │
              └─────────────┘ └──────┬────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Visualization │
                              │ & Analysis   │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Personalized │
                              │   Feedback   │
                              └──────────────┘
```

---

## 🚀 Project Objectives

* Develop an intelligent and personalized coding-learning platform.
* Assess learners' programming skills and identify knowledge gaps.
* Recommend appropriate coding problems according to learner performance.
* Visualize code execution step by step.
* Detect programming errors and misconceptions.
* Provide personalized feedback and recovery exercises.
* Improve debugging and problem-solving abilities.
* Support continuous and adaptive learning.

---

## 📂 Project Structure

```text
VizStruct/
│
├── frontend/                 # Next.js frontend
│   ├── src/
│   ├── components/
│   ├── app/
│   └── public/
│
├── backend/                  # Node.js / Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── services/
│
├── ai-service/               # Python / FastAPI analysis
│
├── docs/                     # Project documentation
│
├── .gitignore
├── LICENSE
└── README.md
```

> The project structure may evolve as development progresses.

---

## 🗺️ Development Roadmap

* [ ] Project setup and repository configuration
* [ ] User authentication
* [ ] Learner profile creation
* [ ] Questionnaire and diagnostic assessment
* [ ] Personalized learning-path generation
* [ ] Coding problem repository
* [ ] Online code editor
* [ ] Secure code execution
* [ ] Step-by-step execution visualization
* [ ] Error and misconception detection
* [ ] Personalized recovery exercises
* [ ] Progress analytics dashboard
* [ ] Adaptive recommendation system
* [ ] Testing and deployment

---

## 👥 Team

**Group G9**

| Team Member        | Role                    |
| ------------------ | ----------------------- |
| **Ayushi Singh**   | Developer / Team leader |
| **Harshita Yadav** | Developer / Team Member |
| **Kartik Nigam**   | Developer / Team Member |
| **Aaman Ahamad**   | Developer / Team Member |
| **Khushi Kedia**   | Developer / Team Member |

### 🎓 Project Guide

**Mr. Pankaj Kumar**
Assistant Professor
Department of Computer Science & Engineering

---

## 🏫 Academic Information

**Department of Computer Science & Engineering**
**IMS Engineering College, Ghaziabad**

Dr. A.P.J. Abdul Kalam Technical University, Lucknow

**Academic Session: 2025–26**

---

## 🔬 Research Foundation

VizStruct is motivated by research in:

* Program visualization for introductory programming
* Algorithm visualization
* Automatic assessment of programming assignments
* Personalized and adaptive programming education

The project explores how these concepts can be integrated into a unified learning environment.

---

## 🔮 Future Scope

Future versions of VizStruct may include:

* AI-generated personalized hints
* Advanced misconception classification
* Multi-language code visualization
* Dynamic difficulty adjustment
* Intelligent learning-path generation
* Gamification and coding streaks
* Peer learning and coding challenges
* Instructor analytics dashboard

---

## 🤝 Contributing

This project is being developed collaboratively as a B.Tech mini project.

Team members should create a separate branch for their work:

```bash
git checkout -b feature/feature-name
```

After completing a feature:

```bash
git add .
git commit -m "Add feature description"
git push origin feature/feature-name
```

A pull request can then be created for review before merging changes into the main branch.

---

## 📜 License

This project is intended for **educational and academic purposes**.

If an open-source license is included in this repository, usage and distribution are subject to the terms of that license.

---

<div align="center">

### 💙 VizStruct

**Don't just run code. Understand it.**

`Assess` • `Recommend` • `Execute` • `Visualize` • `Diagnose` • `Recover`

</div>
