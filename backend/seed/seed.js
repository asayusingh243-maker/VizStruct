require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const DiagnosticQuestion = require("../models/DiagnosticQuestion");
const Problem = require("../models/Problem");

const diagnosticQuestions = [
  {
    question: "Which data structure follows the FIFO principle?",
    topic: "Data Structures",
    difficulty: "easy",
    language: "javascript",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    explanation: "A queue follows First In, First Out.",
    isActive: true,
  },
  {
    question:
      "What is the time complexity of binary search on a sorted array?",
    topic: "Algorithms",
    difficulty: "easy",
    language: "javascript",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(log n)",
    explanation:
      "Binary search halves the search space at each step.",
    isActive: true,
  },
  {
    question:
      "Which keyword declares a block-scoped constant in JavaScript?",
    topic: "JavaScript",
    difficulty: "easy",
    language: "javascript",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const",
    explanation:
      "const declares a block-scoped binding that cannot be reassigned.",
    isActive: true,
  },
  {
    question:
      "Which traversal visits the root before its subtrees?",
    topic: "Trees",
    difficulty: "easy",
    language: "javascript",
    options: [
      "Inorder",
      "Postorder",
      "Preorder",
      "Level-order",
    ],
    correctAnswer: "Preorder",
    explanation:
      "Preorder visits root, left subtree, then right subtree.",
    isActive: true,
  },
  {
    question:
      "Which structure provides average O(1) key lookup?",
    topic: "Hashing",
    difficulty: "medium",
    language: "javascript",
    options: [
      "Hash table",
      "Linked list",
      "Binary tree",
      "Stack",
    ],
    correctAnswer: "Hash table",
    explanation:
      "Hash tables provide average constant-time lookup.",
    isActive: true,
  },
  {
    question:
      "What does recursion require to terminate safely?",
    topic: "Recursion",
    difficulty: "medium",
    language: "javascript",
    options: [
      "A base case",
      "A global variable",
      "A loop",
      "A database connection",
    ],
    correctAnswer: "A base case",
    explanation:
      "The base case prevents infinite recursive calls.",
    isActive: true,
  },
];

const problems = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers and a target, return the indices of two numbers whose sum equals the target.",
    topic: "Arrays",
    difficulty: "easy",
    languages: ["javascript", "python"],
    inputFormat: "An integer array and a target integer.",
    outputFormat:
      "Two indices whose values sum to the target.",
    constraints: ["2 <= n <= 10000"],
    starterCode: {
      javascript:
        "function twoSum(nums, target) {\n  // return the two indices\n}\n",
      python:
        "def two_sum(nums, target):\n    # return the two indices\n    pass\n",
    },
    tags: ["array", "hashing"],
    testCases: [
      {
        input: "[2,7,11,15]\\n9",
        expectedOutput: "[0,1]",
        isHidden: false,
      },
      {
        input: "[3,2,4]\\n6",
        expectedOutput: "[1,2]",
        isHidden: true,
      },
    ],
    solutionExplanation:
      "Use a hash map from value to index while scanning the array.",
    isActive: true,
  },
  {
    title: "Reverse a String",
    description:
      "Return a string with its characters in reverse order.",
    topic: "Strings",
    difficulty: "easy",
    languages: ["javascript", "python"],
    inputFormat: "A string.",
    outputFormat: "The reversed string.",
    constraints: ["1 <= length <= 1000"],
    starterCode: {
      javascript:
        "function reverseString(s) {\n  // return reversed string\n}\n",
      python:
        "def reverse_string(s):\n    # return reversed string\n    pass\n",
    },
    tags: ["string", "two-pointer"],
    testCases: [
      {
        input: "hello",
        expectedOutput: "olleh",
        isHidden: false,
      },
      {
        input: "VizStruct",
        expectedOutput: "tcurtSziV",
        isHidden: true,
      },
    ],
    solutionExplanation:
      "Use a reverse operation or two pointers.",
    isActive: true,
  },
];

async function seed() {
  try {
    await connectDB();

    for (const question of diagnosticQuestions) {
      await DiagnosticQuestion.findOneAndUpdate(
        { question: question.question },
        { $set: question },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    for (const problem of problems) {
      await Problem.findOneAndUpdate(
        { title: problem.title },
        { $set: problem },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log(
      "VizStruct MongoDB Atlas seed completed successfully."
    );
  } catch (error) {
    console.error("MongoDB seed error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
