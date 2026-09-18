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

    console.log("Clearing old sample data...");

    await User.deleteMany({});
    await LearnerProfile.deleteMany({});
    await DiagnosticQuestion.deleteMany({});
    await Problem.deleteMany({});
    await RecoveryExercise.deleteMany({});

    // -------------------------
    // 1. Create sample user
    // -------------------------

    const hashedPassword = await bcrypt.hash("Test@12345", 10);

    const user = await User.create({
      name: "Test Student",
      email: "student@vizstruct.com",
      password: hashedPassword,
      role: "student",
    });

    console.log("User created");

    // -------------------------
    // 2. Create learner profile
    // -------------------------

    await LearnerProfile.create({
      userId: user._id,
      skillLevel: "beginner",
      programmingLanguages: ["JavaScript", "Python"],
      strengths: ["Variables", "Basic syntax"],
      weaknesses: ["Loops", "Arrays"],
      learningPreferences: ["Practice", "Step-by-step explanation"],
      interests: ["Web Development", "Problem Solving"],
      goals: ["Improve programming fundamentals"],
    });

    console.log("Learner profile created");

    // -------------------------
    // 3. Diagnostic questions
    // -------------------------

    const questions = await DiagnosticQuestion.insertMany([
      {
        question: "Which keyword is used to declare a variable in JavaScript?",
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
        question: "Which loop is commonly used to iterate through an array?",
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
        question: "Which data structure stores multiple values in Python?",
        topic: "Arrays",
        difficulty: "easy",
        language: "Python",
        options: ["list", "integer", "boolean", "float"],
        correctAnswer: "list",
        explanation:
          "Python lists are used to store multiple values in an ordered collection.",
        isActive: true,
      },
    ]);

    console.log(`${questions.length} diagnostic questions created`);

    // -------------------------
    // 4. Create sample problem
    // -------------------------

    const problem = await Problem.create({
      title: "Sum of Two Numbers",

      description:
        "Write a program that takes two numbers and returns their sum.",

      topic: "Variables",

      difficulty: "easy",

      languages: ["JavaScript", "Python"],

      inputFormat:
        "Two numbers are provided as input.",

      outputFormat:
        "Print the sum of the two numbers.",

      constraints: [
        "The numbers are integers.",
        "The numbers are within a reasonable range.",
      ],

      testCases: [
        {
          input: "2 3",
          expectedOutput: "5",
          isHidden: false,
        },

        {
          input: "10 20",
          expectedOutput: "30",
          isHidden: true,
        },
      ],

      starterCode: {
        JavaScript:
          "const input = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);",

        Python:
          "a, b = map(int, input().split())",
      },

      tags: ["variables", "basic", "arithmetic"],

      solutionExplanation:
        "Read two numbers and add them together.",

      isActive: true,
    });

    console.log("Problem created");

    // -------------------------
    // 5. Create recovery exercise
    // -------------------------

    await RecoveryExercise.create({
      title: "Practice Basic Variables",

      description:
        "Practice storing values in variables and using them in simple calculations.",

      topic: "Variables",

      misconception:
        "Difficulty understanding how values are stored and used in variables.",

      difficulty: "easy",

      language: "JavaScript",

      instructions: [
        "Create two variables.",
        "Store numbers in the variables.",
        "Add the values together.",
        "Display the result.",
      ],

      hints: [
        "Use let or const to create variables.",
        "Use the + operator to add the values.",
      ],

      expectedConcept:
        "Variables store values that can be used in expressions.",

      relatedProblemId: problem._id,

      isActive: true,
    });

    console.log("Recovery exercise created");

    console.log("\n=================================");
    console.log("VizStruct database seeded!");
    console.log("=================================");
    console.log(`User ID: ${user._id}`);
    console.log(`Problem ID: ${problem._id}`);
    console.log(`Email: student@vizstruct.com`);
    console.log(`Password: Test@12345`);
    console.log("=================================\n");

    await mongoose.connection.close();

    console.log("Database connection closed.");
  } catch (error) {
    console.error("Seed error:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();