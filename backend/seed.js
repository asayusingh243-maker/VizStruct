require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./data/db");

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
    await Problem.findOneAndUpdate(
      { title: "Find the Largest Element" },
      {
        $set: {
          title: "Find the Largest Element",
          description:
            "Given a sequence of integers, print the largest value.",
          topic: "Arrays",
          difficulty: "easy",
          languages: ["Python"],
          inputFormat: "A space-separated sequence of integers.",
          outputFormat: "Print the largest integer.",
          constraints: [
            "The input contains at least one integer.",
            "The input contains at most 10,000 integers.",
          ],
          testCases: [
            {
              input: "4 7 2 9 5",
              expectedOutput: "9",
              isHidden: false,
            },
            {
              input: "12 3 8 6",
              expectedOutput: "12",
              isHidden: false,
            },
            {
              input: "-5 -2 -9 -1",
              expectedOutput: "-1",
              isHidden: false,
            },
            {
              input: "0 -1 -8 -3",
              expectedOutput: "0",
              isHidden: true,
            },
          ],
          starterCode: {
            Python:
              "def find_largest(arr):\n    # Write your solution here\n    pass\n\n\nnumbers = list(map(int, input().split()))\nprint(find_largest(numbers))",
          },
          tags: ["arrays", "fundamentals"],
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

    console.log("Find the Largest Element problem created/updated");
    const problem = await Problem.findOneAndUpdate(
      {
        title: "Sum of Two Numbers",
      },
      {
        $set: {
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
        title: "Practice Basic Variables",
      },
      {
        $set: {
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