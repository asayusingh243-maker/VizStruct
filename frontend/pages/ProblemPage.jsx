import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { CodeEditor } from '../components/problem/CodeEditor';
import { OutputConsole } from '../components/problem/OutputConsole';
import { MOCK_PROBLEMS } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const problem = MOCK_PROBLEMS.find((p) => p.id === id) || MOCK_PROBLEMS[0];

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(problem.initialCode[language] || problem.initialCode.python);
  const [customInput, setCustomInput] = useState(problem.sampleInput);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (problem.initialCode[lang]) {
      setCode(problem.initialCode[lang]);
    }
  };

  const handleReset = () => {
    if (problem.initialCode[language]) {
      setCode(problem.initialCode[language]);
      addToast('Code reset to starter template', 'info');
    } else {
      setCode('');
    }
    setOutput(null);
  };

  const evaluateCode = (inputCode, currentLang) => {
    const trimmed = inputCode.trim();

    if (!trimmed) {
      return {
        status: 'Compile Error',
        runtime: 'N/A',
        memory: 'N/A',
        stdout: `Compilation Error:\nLine 1: Code editor is empty. Please write your solution before running.`
      };
    }

    const isUnmodifiedStarter = 
      trimmed.includes('Write your solution here') || 
      trimmed.includes('Write your code here') || 
      (trimmed.endsWith('pass') && trimmed.split('\n').length <= 3);

    if (isUnmodifiedStarter) {
      return {
        status: 'Wrong Answer',
        runtime: '10ms',
        memory: '13.5 MB',
        stdout: `Testcase 1 Failed!\nInput: ${customInput}\nExpected Output: ${problem.expectedOutput}\nActual Output: None / Unimplemented`
      };
    }

    const hasLogic = 
      trimmed.includes('for') || 
      trimmed.includes('while') || 
      trimmed.includes('if') || 
      trimmed.includes('return') ||
      trimmed.includes('swap') ||
      trimmed.includes('sort') ||
      trimmed.includes('append') ||
      trimmed.includes('pop');

    if (!hasLogic) {
      return {
        status: 'Wrong Answer',
        runtime: '12ms',
        memory: '13.8 MB',
        stdout: `Testcase 1 Failed!\nInput: ${customInput}\nExpected Output: ${problem.expectedOutput}\nActual Output: Null`
      };
    }

    return {
      status: 'Accepted',
      runtime: '16ms',
      memory: '14.0 MB',
      stdout: `Execution Successful!\nInput: ${customInput}\nOutput: ${problem.expectedOutput}\nTestcases passed: 1/1 (Runtime: 16ms)`
    };
  };

  const handleRunCode = () => {
    setIsRunning(true);
    addToast('Compiling & running...', 'info');

    setTimeout(() => {
      setIsRunning(false);
      const result = evaluateCode(code, language);
      setOutput(result);

      if (result.status === 'Accepted') {
        addToast('Accepted!', 'success');
      } else {
        addToast('Testcase Failed', 'warning');
      }
    }, 700);
  };

  const handleSubmitCode = () => {
    setIsRunning(true);

    setTimeout(() => {
      setIsRunning(false);
      const result = evaluateCode(code, language);

      if (result.status !== 'Accepted') {
        setOutput(result);
        addToast(`Submission Failed: ${result.status}`, 'error');
      } else {
        setOutput({
          status: 'Accepted',
          runtime: '14ms',
          memory: '13.9 MB',
          stdout: `All Testcases Passed!\nRuntime: 14ms (Beats 94.2% of submissions)\nMemory: 13.9 MB\n+${problem.points} Points Earned!`
        });
        addToast(`Problem Solved! +${problem.points} Points.`, 'success');
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col h-screen overflow-hidden">
      <Navbar />

      {/* Main IDE Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden">
        
        {/* Left Column: Problem Description Pane (5 cols) */}
        <div className="lg:col-span-5 bg-[#121215] border border-[#27272A] rounded p-4 flex flex-col h-full overflow-y-auto">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#27272A] mb-3">
            <button
              onClick={() => navigate('/problems')}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Problems</span>
            </button>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className={`px-2 py-0.5 rounded ${
                problem.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {problem.difficulty}
              </span>
              <span className="text-zinc-400 font-semibold">
                +{problem.points} PTS
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-base font-bold font-outfit text-white">{problem.title}</h1>
            
            <div className="prose prose-invert prose-sm max-w-none text-zinc-300 space-y-3 font-sans text-xs leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Quick Recovery Banner if Wrong Answer */}
            {output && output.status !== 'Accepted' && (
              <div className="p-3.5 rounded bg-rose-950/40 border border-rose-800/80 text-xs space-y-2 mt-4 font-mono">
                <div className="flex items-center gap-2 font-bold text-rose-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Execution Failure ({output.status})</span>
                </div>
                <p className="text-zinc-300 font-sans text-xs">
                  Your solution failed one or more testcases. View the visual error breakdown to inspect the logic issue.
                </p>
                <button
                  onClick={() => navigate('/recovery')}
                  className="w-full py-1.5 rounded bg-rose-900 hover:bg-rose-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>View Debug Hints</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Code Editor + Output Console Pane (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3 h-full overflow-hidden">
          
          {/* Top: Monaco Code Editor Pane */}
          <div className="flex-1 min-h-[50%]">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={handleLanguageChange}
              onReset={handleReset}
            />
          </div>

          {/* Bottom: Output Console Pane */}
          <div className="h-[45%]">
            <OutputConsole
              customInput={customInput}
              setCustomInput={setCustomInput}
              output={output}
              isRunning={isRunning}
              onRun={handleRunCode}
              onSubmit={handleSubmitCode}
              problemId={problem.id}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
