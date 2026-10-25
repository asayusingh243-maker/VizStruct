require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");
const LearnerProfile = require("./models/LearnerProfile");
const DiagnosticQuestion = require("./models/DiagnosticQuestion");
const Problem = require("./models/Problem");
const RecoveryExercise = require("./models/RecoveryExercise");

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Seeding VizStruct database...");
    const hashedPassword = await bcrypt.hash("Test@12345", 10);

    const user = await User.findOneAndUpdate(
      {
        email: "student@vizstruct.com",
      },
      {
        $set: {
          fullName: "Test Student",
          email: "student@vizstruct.com",
          password: hashedPassword,
          level: "Beginner",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("Sample user created/updated");
    await LearnerProfile.findOneAndUpdate(
      {
        userId: user._id,
      },
      {
        $set: {
          userId: user._id,
          skillLevel: "beginner",
          programmingLanguages: ["JavaScript", "Python"],
          strengths: ["Variables", "Basic syntax"],
          weaknesses: ["Loops", "Arrays"],
          learningPreferences: [
            "Practice",
            "Step-by-step explanation",
          ],
          interests: ["Web Development", "Problem Solving"],
          goals: ["Improve programming fundamentals"],
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("Learner profile created/updated");
    const questions = [
      {
        question:
          "Which keyword is used to declare a variable in JavaScript?",
        topic: "Variables",
        difficulty: "easy",
        language: "JavaScript",
        options: ["var", "define", "variable", "letvar"],
        correctAnswer: "var",
        explanation:
          "The var keyword can be used to declare a variable in JavaScript.",
        isActive: true,
      },
      {
        question:
          "Which loop is commonly used to iterate through an array?",
        topic: "Loops",
        difficulty: "easy",
        language: "JavaScript",
        options: ["for", "if", "switch", "try"],
        correctAnswer: "for",
        explanation:
          "A for loop is commonly used to iterate through array elements.",
        isActive: true,
      },
      {
        question:
          "Which data structure stores multiple values in Python?",
        topic: "Arrays",
        difficulty: "easy",
        language: "Python",
        options: ["list", "integer", "boolean", "float"],
        correctAnswer: "list",
        explanation:
          "Python lists are used to store multiple values in an ordered collection.",
        isActive: true,
      },
    ];

    for (const question of questions) {
      await DiagnosticQuestion.findOneAndUpdate(
        {
          question: question.question,
        },
        {
          $set: question,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log(
      `${questions.length} diagnostic questions created/updated`
    );
    const problem = await Problem.findOneAndUpdate(
  {
    title: "Find the Largest Element",
  },
  {
    $set: {
      title: "Find the Largest Element",
      description:
        "Given an array of integers, find and return the largest element.",
      topic: "Arrays",
      difficulty: "easy",
      languages: ["JavaScript", "Python"],
      inputFormat:
        "The first line contains an integer n. The second line contains n integers.",
      outputFormat:
        "Print the largest element in the array.",
      constraints: [
        "1 <= n <= 1000",
        "The array contains integers.",
      ],
      testCases: [
        {
          input: "5\n1 8 3 2 6",
          expectedOutput: "8",
          isHidden: false,
        },
        {
          input: "4\n10 4 7 2",
          expectedOutput: "10",
          isHidden: true,
        },
      ],
      starterCode: {
        JavaScript:
          "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = input[0];\nconst arr = input.slice(1, n + 1);\n\n// Find the largest element.\n",
        Python:
          "n = int(input())\narr = list(map(int, input().split()))\n\n# Find the largest element.\n",
      },
      tags: ["arrays", "loops", "maximum"],
      solutionExplanation:
        "Read the array and keep track of the largest value while traversing its elements.",
      isActive: true,
    },
  },
  {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  }
);

    console.log("Problem created/updated");
    await RecoveryExercise.findOneAndUpdate(
  {
    title: "Practice Finding the Largest Element",
  },
  {
    $set: {
      title: "Practice Finding the Largest Element",

      description:
        "Practice traversing an array and identifying the largest element.",

      topic: "Arrays",

      misconception:
        "Difficulty understanding how to traverse an array and keep track of the largest value.",

      difficulty: "easy",

      language: "JavaScript",

      instructions: [
        "Create an array of numbers.",
        "Start with the first element as the largest value.",
        "Traverse the remaining elements.",
        "Update the largest value whenever a larger element is found.",
        "Display the largest value.",
      ],

      hints: [
        "Use a loop to visit each element.",
        "Keep a variable that stores the largest value seen so far.",
      ],

      expectedConcept:
        "The largest element of an array can be found by traversing the array while tracking the maximum value.",

      relatedProblemId: problem._id,

      isActive: true,
    },
  },
  {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  }
);
    console.log("Recovery exercise created/updated");

    console.log("\n=================================");
    console.log("VizStruct database seeded!");
    console.log("=================================");
    console.log(`User ID: ${user._id}`);
    console.log(`Problem ID: ${problem._id}`);
    console.log("Email: student@vizstruct.com");
    console.log("Password: Test@12345");
    console.log("=================================\n");

    await mongoose.connection.close();

    console.log("Database connection closed.");
  } catch (error) {
    console.error("Seed error:", error.message);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedDatabase();