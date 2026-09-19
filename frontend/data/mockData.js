// Data Store for VizStruct - Data Structure & Algorithm Visualizer

export const MOCK_USER = {
  id: "usr_9921",
  name: "Alex Mercer",
  email: "alex.mercer@dev.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  role: "Software Engineer",
  masteryScore: 842,
  streak: 14,
  completedCount: 42,
  totalProblems: 120,
  joinedDate: "January 2026",
  skillLevel: "Intermediate",
  preferredLanguage: "Python",
  weeklyGoal: 10,
  weeklyProgress: 7,
  
  masteryBreakdown: [
    { topic: "Arrays & Strings", score: 92, status: "Mastered", color: "#10B981" },
    { topic: "Stacks & Queues", score: 85, status: "Proficient", color: "#3B82F6" },
    { topic: "Trees & Graphs", score: 64, status: "Developing", color: "#F59E0B" },
    { topic: "Dynamic Programming", score: 48, status: "Needs Practice", color: "#EF4444" },
    { topic: "Sorting & Searching", score: 88, status: "Proficient", color: "#8B5CF6" },
  ],

  weakTopics: [
    { name: "Dynamic Programming (Knapsack & Subsequences)", errorRate: "42%", recommended: "07-coin-change" },
    { name: "Graph Traversal (DFS Edge Cases)", errorRate: "35%", recommended: "09-number-of-islands" },
    { name: "Binary Search Boundary Conditions", errorRate: "28%", recommended: "02-binary-search" }
  ],

  strongTopics: [
    { name: "Two Pointers Technique", accuracy: "96%" },
    { name: "Stack-based Expression Parsing", accuracy: "92%" },
    { name: "Array In-Place Transposition", accuracy: "90%" }
  ],

  recentActivity: [
    { id: 1, problem: "Bubble Sort Visualization", type: "Visualizer", timestamp: "2 hours ago", status: "Completed", score: "+25 pts" },
    { id: 2, problem: "Two Sum", type: "IDE Practice", timestamp: "Yesterday", status: "Accepted", score: "+15 pts" },
    { id: 3, problem: "Valid Parentheses", type: "Recovery Path", timestamp: "2 days ago", status: "Remediated", score: "+30 pts" },
    { id: 4, problem: "Binary Search", type: "IDE Practice", timestamp: "3 days ago", status: "Accepted", score: "+20 pts" }
  ]
};

export const MOCK_PROBLEMS = [
  {
    id: "01-bubble-sort",
    title: "Bubble Sort Algorithm",
    difficulty: "Easy",
    category: "Sorting & Searching",
    acceptanceRate: "91%",
    points: 15,
    description: `Given an array of unsorted integers, implement the **Bubble Sort** algorithm to sort the array in ascending order.
    
Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. This process is repeated until the array is sorted.

### Example 1:
Input: nums = [5, 1, 4, 2, 8]
Output: [1, 2, 4, 5, 8]

### Constraints:
* 1 <= nums.length <= 100
* -1000 <= nums[i] <= 1000`,
    initialCode: {
      python: `def bubble_sort(arr):\n    # Write your solution here\n    pass`,
      javascript: `function bubbleSort(arr) {\n  // Write your code here\n}`,
      java: `public class Solution {\n    public static void bubbleSort(int[] arr) {\n        // Write your code here\n    }\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nvoid bubbleSort(vector<int>& arr) {\n    // Write your code here\n}`
    },
    sampleInput: "[5, 1, 4, 2, 8]",
    expectedOutput: "[1, 2, 4, 5, 8]"
  },
  {
    id: "02-two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Strings",
    acceptanceRate: "84%",
    points: 15,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example 1:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    initialCode: {
      python: `def two_sum(nums, target):\n    # Write your solution here\n    pass`,
      javascript: `function twoSum(nums, target) {\n  // Write your code here\n}`,
      java: `public class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n}`
    },
    sampleInput: "nums = [2, 7, 11, 15], target = 9",
    expectedOutput: "[0, 1]"
  },
  {
    id: "03-valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks & Queues",
    acceptanceRate: "78%",
    points: 20,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    initialCode: {
      python: `def isValid(s: str) -> bool:\n    # Write your solution here\n    pass`,
      javascript: `function isValid(s) {\n  // Write your code here\n}`,
      java: `import java.util.Stack;\n\npublic class Solution {\n    public static boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}`,
      cpp: `#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Write your code here\n}`
    },
    sampleInput: 's = "{[]}"',
    expectedOutput: "true"
  },
  {
    id: "04-binary-search",
    title: "Binary Search Boundary",
    difficulty: "Medium",
    category: "Sorting & Searching",
    acceptanceRate: "65%",
    points: 25,
    description: `Given an array of integers nums sorted in ascending order, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`,
    initialCode: {
      python: `def search(nums, target):\n    # Write your solution here\n    pass`,
      javascript: `function search(nums, target) {\n  // Write your code here\n}`,
      java: `public class Solution {\n    public static int search(int[] nums, int target) {\n        // Write your code here\n        return -1;\n    }\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // Write your code here\n}`
    },
    sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
    expectedOutput: "4"
  },
  {
    id: "05-coin-change",
    title: "Coin Change (DP)",
    difficulty: "Hard",
    category: "Dynamic Programming",
    acceptanceRate: "42%",
    points: 35,
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.`,
    initialCode: {
      python: `def coinChange(coins, amount):\n    # Write your solution here\n    pass`,
      javascript: `function coinChange(coins, amount) {\n  // Write your code here\n}`,
      java: `public class Solution {\n    public static int coinChange(int[] coins, int amount) {\n        // Write your code here\n        return -1;\n    }\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nint coinChange(vector<int>& coins, int amount) {\n    // Write your code here\n}`
    },
    sampleInput: "coins = [1, 2, 5], amount = 11",
    expectedOutput: "3"
  }
];

export const MOCK_EXECUTION_TRACES = {
  "01-bubble-sort": {
    algorithmName: "Bubble Sort",
    codeLines: [
      "def bubble_sort(arr):",
      "    n = len(arr)",
      "    for i in range(n):",
      "        for j in range(0, n - i - 1):",
      "            if arr[j] > arr[j + 1]:",
      "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
      "    return arr"
    ],
    steps: [
      {
        stepIndex: 1,
        line: 1,
        explanation: "Function bubble_sort initialized with array [5, 1, 4, 2, 8]",
        variables: { arr: "[5, 1, 4, 2, 8]" },
        arrayState: [5, 1, 4, 2, 8],
        highlightIndices: [],
        stackFrames: ["bubble_sort(arr=[5, 1, 4, 2, 8])"],
        stdout: "Trace initialized..."
      },
      {
        stepIndex: 2,
        line: 2,
        explanation: "Calculate array length n = 5",
        variables: { arr: "[5, 1, 4, 2, 8]", n: 5 },
        arrayState: [5, 1, 4, 2, 8],
        highlightIndices: [],
        stackFrames: ["bubble_sort(arr=[5, 1, 4, 2, 8])"],
        stdout: ""
      },
      {
        stepIndex: 3,
        line: 3,
        explanation: "Outer loop pass i = 0",
        variables: { arr: "[5, 1, 4, 2, 8]", n: 5, i: 0 },
        arrayState: [5, 1, 4, 2, 8],
        highlightIndices: [0],
        stackFrames: ["bubble_sort"],
        stdout: "Outer pass i = 0 starting"
      },
      {
        stepIndex: 4,
        line: 4,
        explanation: "Inner loop index j = 0. Comparing arr[0] (5) and arr[1] (1)",
        variables: { arr: "[5, 1, 4, 2, 8]", n: 5, i: 0, j: 0 },
        arrayState: [5, 1, 4, 2, 8],
        highlightIndices: [0, 1],
        status: "comparing",
        stackFrames: ["bubble_sort"],
        stdout: "Comparing 5 > 1 -> True"
      },
      {
        stepIndex: 5,
        line: 6,
        explanation: "5 > 1 is True! Swapping arr[0] and arr[1]",
        variables: { arr: "[1, 5, 4, 2, 8]", n: 5, i: 0, j: 0 },
        arrayState: [1, 5, 4, 2, 8],
        highlightIndices: [0, 1],
        status: "swapped",
        stackFrames: ["bubble_sort"],
        stdout: "Swapped! New Array: [1, 5, 4, 2, 8]"
      },
      {
        stepIndex: 6,
        line: 4,
        explanation: "Inner loop index j = 1. Comparing arr[1] (5) and arr[2] (4)",
        variables: { arr: "[1, 5, 4, 2, 8]", n: 5, i: 0, j: 1 },
        arrayState: [1, 5, 4, 2, 8],
        highlightIndices: [1, 2],
        status: "comparing",
        stackFrames: ["bubble_sort"],
        stdout: "Comparing 5 > 4 -> True"
      },
      {
        stepIndex: 7,
        line: 6,
        explanation: "5 > 4 is True! Swapping arr[1] and arr[2]",
        variables: { arr: "[1, 4, 5, 2, 8]", n: 5, i: 0, j: 1 },
        arrayState: [1, 4, 5, 2, 8],
        highlightIndices: [1, 2],
        status: "swapped",
        stackFrames: ["bubble_sort"],
        stdout: "Swapped! New Array: [1, 4, 5, 2, 8]"
      },
      {
        stepIndex: 8,
        line: 4,
        explanation: "Inner loop index j = 2. Comparing arr[2] (5) and arr[3] (2)",
        variables: { arr: "[1, 4, 5, 2, 8]", n: 5, i: 0, j: 2 },
        arrayState: [1, 4, 5, 2, 8],
        highlightIndices: [2, 3],
        status: "comparing",
        stackFrames: ["bubble_sort"],
        stdout: "Comparing 5 > 2 -> True"
      },
      {
        stepIndex: 9,
        line: 6,
        explanation: "5 > 2 is True! Swapping arr[2] and arr[3]",
        variables: { arr: "[1, 4, 2, 5, 8]", n: 5, i: 0, j: 2 },
        arrayState: [1, 4, 2, 5, 8],
        highlightIndices: [2, 3],
        status: "swapped",
        stackFrames: ["bubble_sort"],
        stdout: "Swapped! New Array: [1, 4, 2, 5, 8]"
      },
      {
        stepIndex: 10,
        line: 4,
        explanation: "Inner loop index j = 3. Comparing arr[3] (5) and arr[4] (8)",
        variables: { arr: "[1, 4, 2, 5, 8]", n: 5, i: 0, j: 3 },
        arrayState: [1, 4, 2, 5, 8],
        highlightIndices: [3, 4],
        status: "comparing",
        stackFrames: ["bubble_sort"],
        stdout: "Comparing 5 > 8 -> False. No swap needed."
      },
      {
        stepIndex: 11,
        line: 3,
        explanation: "Outer pass i = 1 starting. Element at index 4 (8) is in sorted position.",
        variables: { arr: "[1, 4, 2, 5, 8]", n: 5, i: 1 },
        arrayState: [1, 4, 2, 5, 8],
        highlightIndices: [4],
        status: "sorted",
        stackFrames: ["bubble_sort"],
        stdout: "Pass 1 complete."
      },
      {
        stepIndex: 12,
        line: 6,
        explanation: "Subsequent pass swaps 4 and 2 to reach final sorted state.",
        variables: { arr: "[1, 2, 4, 5, 8]", n: 5, i: 4 },
        arrayState: [1, 2, 4, 5, 8],
        highlightIndices: [0, 1, 2, 3, 4],
        status: "sorted",
        stackFrames: [],
        stdout: "Bubble Sort Complete! Return [1, 2, 4, 5, 8]"
      }
    ]
  }
};

export const MOCK_RECOVERY_DATA = {
  problemId: "03-valid-parentheses",
  title: "Valid Parentheses",
  userCode: `def isValid(s):\n    stack = []\n    for char in s:\n        if char == '(':\n            stack.append(char)\n        elif char == ')':\n            stack.pop()\n    return True  # Bug: returns True always`,
  errorType: "Wrong Answer (Logic Edge Case)",
  failedTestCase: 'Input: s = "(]" -> Expected: False, Got: True',
  explanation: `Your algorithm pop'd the stack whenever it saw a closing parenthesis ')', but it failed to verify that the closing character matches the exact type of the corresponding opening bracket. Additionally, if the stack is empty when pop() is called, Python will raise an IndexError.`,
  visualHint: {
    expected: ["Push '(' -> Stack: ['(']", "Encounter ']' -> Check top of stack ('(') vs ']' -> MISMATCH! Return False"],
    actual: ["Push '(' -> Stack: ['(']", "Encounter ']' -> Unconditionally pop '(' -> Return True (INVALID!)"]
  },
  miniQuestion: {
    question: "What structure allows matching the most recently opened bracket with the first closed bracket?",
    options: [
      "Queue (FIFO - First In First Out)",
      "Stack (LIFO - Last In First Out)",
      "Hash Map lookup table",
      "Binary Search Tree"
    ],
    correctIndex: 1,
    explanation: "Correct! Stacks follow Last-In, First-Out (LIFO), which perfectly matches nested structure closing order."
  }
};

export const ONBOARDING_QUESTIONS = [
  {
    id: "skillLevel",
    title: "What is your current coding proficiency?",
    subtitle: "VizStruct adapts line-by-line visual step speeds and hint detail to your background.",
    options: [
      { value: "Beginner", title: "Beginner coder", description: "Learning basic control loops, variables, and function syntax." },
      { value: "Intermediate", title: "Intermediate developer", description: "Familiar with core data structures (Arrays, Linked Lists, Stacks)." },
      { value: "Advanced", title: "Competitive / Advanced", description: "Mastering complex Dynamic Programming, Graphs, and Tree algorithms." }
    ]
  },
  {
    id: "language",
    title: "What is your primary programming language?",
    subtitle: "Select the language you want to visualize and practice in.",
    options: [
      { value: "Python", title: "Python 3", description: "Clean syntax, expressive, standard for interview visual tracing." },
      { value: "JavaScript", title: "JavaScript / TypeScript", description: "Web-native, closure & scope tracking visualizer." },
      { value: "C++", title: "C++", description: "Explicit memory pointers, array indexing, and reference visualization." },
      { value: "Java", title: "Java", description: "Object-oriented stack frames, heap references, and collections." }
    ]
  },
  {
    id: "goal",
    title: "What is your primary learning objective?",
    subtitle: "We will tailor your daily goal recommendations.",
    options: [
      { value: "interview", title: "Ace Technical Coding Interviews", description: "Focus on LeetCode patterns and algorithm visual breakdowns." },
      { value: "academics", title: "Excel in Computer Science Courses", description: "Deep visual understanding of data structure operations." },
      { value: "upskill", title: "Professional Skill Upgrade", description: "Master code efficiency, space complexity, and optimal structures." }
    ]
  }
];
