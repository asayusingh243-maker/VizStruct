/**
 * store.js
 * ------------------------------------------------------
 * THIS IS NOT A REAL DATABASE.
 * It is just plain JavaScript arrays living in the server's
 * memory (RAM). That means:
 *   - Data is available while the server is running.
 *   - Data is LOST every time you restart the server.
 *
 * This is perfect for learning / demo purposes and matches
 * the requirement: "backend code, no database".
 *
 * When you are ready to add a real database (MongoDB, etc.),
 * you only need to change the code inside the "controllers"
 * folder - the routes and the rest of the app will not change.
 * ------------------------------------------------------
 */

// Holds every registered user
// shape: { id, fullName, email, password (hashed), level, createdAt }
const users = [];

// Holds diagnostic test results per user
// shape: { userId, score, weakConcepts: [], takenAt }
const diagnosticResults = [];

// Holds practice progress per user
// shape: { userId, problemId, status: "attempted"|"solved", attempts, lastCode, solvedAt }
const progressRecords = [];

// Simple auto-increment counter used to create fake IDs
let nextUserId = 1;

/**
 * Diagnostic questions
 * (Matches the shape already used by the frontend's
 * app/diagnostic/page.tsx file)
 */
const diagnosticQuestions = [
  {
    id: 1,
    concept: "Variables",
    difficulty: "Foundation",
    title: "What value will be printed?",
    description: "Trace the variable updates before choosing your answer.",
    code: "x = 5\nx = x + 3\nx = x * 2\n\nprint(x)",
    options: ["8", "10", "13", "16"],
    correctAnswer: "16",
  },
  {
    id: 2,
    concept: "Conditions",
    difficulty: "Foundation",
    title: "Which output will this code produce?",
    description: "Follow the condition carefully.",
    code: 'x = 7\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")',
    options: ["A", "B", "C", "No output"],
    correctAnswer: "B",
  },
  {
    id: 3,
    concept: "Loops",
    difficulty: "Foundation",
    title: "How many times will the loop execute?",
    description: "Count the iterations carefully.",
    code: "for i in range(3):\n    print(i)",
    options: ["3 times", "4 times", "5 times", "Infinite times"],
    correctAnswer: "3 times",
  },
  {
    id: 4,
    concept: "Arrays",
    difficulty: "Core",
    title: "Which value is accessed?",
    description: "Remember that array indexing starts at 0.",
    code: "arr = [4, 7, 2, 9]\nprint(arr[2])",
    options: ["4", "7", "2", "9"],
    correctAnswer: "2",
  },
  {
    id: 5,
    concept: "Loops",
    difficulty: "Core",
    title: "What is the final value of total?",
    description: "Trace how 'total' changes on every loop iteration.",
    code: "total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)",
    options: ["2", "3", "5", "6"],
    correctAnswer: "6",
  },
  {
    id: 6,
    concept: "Functions",
    difficulty: "Core",
    title: "What will the function return?",
    description: "Trace the function call step by step.",
    code: "def double(n):\n    return n * 2\n\nprint(double(8))",
    options: ["4", "8", "16", "20"],
    correctAnswer: "16",
  },
];

/**
 * Practice problems
 * (Matches the shape used by app/practice/page.tsx)
 */
const practiceProblems = [
  {
    id: 1,
    title: "Find the Largest Number",
    concept: "Arrays",
    difficulty: "Foundation",
    description:
      "Write a function that returns the largest number inside an array.",
    starterCode:
      "def find_largest(arr):\n    # Write your solution here\n    pass\n\n\nnumbers = [4, 7, 2, 9, 5]\nprint(find_largest(numbers))",
    testCases: [
      { input: "[4, 7, 2, 9, 5]", expected: "9" },
      { input: "[12, 3, 8, 6]", expected: "12" },
      { input: "[-5, -2, -9, -1]", expected: "-1" },
    ],
    hints: [
      "Think about keeping track of the largest value you have seen so far.",
      "Start by assuming the first element is the largest. Then compare the remaining elements with it.",
      "Pseudocode:\n1. Store the first array element as current_largest\n2. Visit every element\n3. If an element is greater than current_largest, update it\n4. Return current_largest",
    ],
  },
  {
    id: 2,
    title: "Sum of a List",
    concept: "Loops",
    difficulty: "Foundation",
    description: "Write a function that returns the sum of all numbers in a list.",
    starterCode:
      "def sum_list(nums):\n    # Write your solution here\n    pass\n\n\nprint(sum_list([1, 2, 3, 4]))",
    testCases: [
      { input: "[1, 2, 3, 4]", expected: "10" },
      { input: "[10, 20]", expected: "30" },
    ],
    hints: [
      "Start a running total at 0 and add every element to it.",
    ],
  },
];

module.exports = {
  users,
  diagnosticResults,
  progressRecords,
  diagnosticQuestions,
  practiceProblems,
  getNextUserId: () => nextUserId++,
};
