import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Lightbulb,
  FileCode
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { MOCK_RECOVERY_DATA } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export const RecoveryPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const data = MOCK_RECOVERY_DATA;

  const [selectedOption, setSelectedOption] = useState(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleQuizSubmit = () => {
    if (selectedOption === null) {
      addToast('Select an answer option first', 'warning');
      return;
    }
    setSubmittedQuiz(true);
    if (selectedOption === data.miniQuestion.correctIndex) {
      addToast('Correct! Concept verified.', 'success');
    } else {
      addToast('Review the explanation and try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto space-y-5">
          
          {/* Header Banner */}
          <div className="p-4 rounded bg-[#121215] border border-rose-900/60 font-mono text-xs space-y-1">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white">Debug Hints &amp; Execution Analysis</h1>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[10px]">
                  {data.errorType}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 pl-6">
              Problem: <strong className="text-zinc-200">{data.title}</strong> • Failed: <code className="text-rose-300">{data.failedTestCase}</code>
            </p>
          </div>

          {/* Error Explanation Card */}
          <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-2">
            <div className="flex items-center gap-2 text-zinc-200 text-xs font-mono font-bold">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span>Execution Error Breakdown</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-[#09090B] p-3.5 rounded border border-[#27272A]">
              {data.explanation}
            </p>
          </div>

          {/* Visual Hint Side-By-Side Comparison */}
          <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-3">
            <div className="flex items-center gap-2 text-zinc-200 text-xs font-mono font-bold">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Execution Comparison (Expected vs Actual)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              {/* Expected Trace */}
              <div className="p-3 rounded bg-[#09090B] border border-emerald-900/60 space-y-2">
                <div className="text-emerald-400 font-bold font-mono flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Expected Trace
                </div>
                {data.visualHint.expected.map((step, idx) => (
                  <div key={idx} className="p-2 rounded bg-zinc-900 text-emerald-200 border border-emerald-900/40 text-[11px]">
                    Step {idx + 1}: {step}
                  </div>
                ))}
              </div>

              {/* Actual Trace */}
              <div className="p-3 rounded bg-[#09090B] border border-rose-900/60 space-y-2">
                <div className="text-rose-400 font-bold font-mono flex items-center gap-1.5 text-xs">
                  <XCircle className="w-3.5 h-3.5" /> Actual Execution
                </div>
                {data.visualHint.actual.map((step, idx) => (
                  <div key={idx} className="p-2 rounded bg-zinc-900 text-rose-200 border border-rose-900/40 text-[11px]">
                    Step {idx + 1}: {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mini Practice Question Widget */}
          <div className="p-4 rounded bg-[#121215] border border-[#27272A] space-y-3">
            <div className="flex items-center gap-2 text-zinc-200 text-xs font-mono font-bold">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Concept Check</span>
            </div>

            <p className="text-xs font-semibold text-zinc-100 font-sans">{data.miniQuestion.question}</p>

            <div className="space-y-2 font-mono text-xs">
              {data.miniQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === data.miniQuestion.correctIndex;
                let bgClass = 'bg-[#09090B] border-[#27272A] hover:border-zinc-700';

                if (submittedQuiz) {
                  if (isCorrect) bgClass = 'bg-emerald-950/60 border-emerald-700 text-emerald-200';
                  else if (isSelected && !isCorrect) bgClass = 'bg-rose-950/60 border-rose-700 text-rose-200';
                } else if (isSelected) {
                  bgClass = 'bg-blue-950/60 border-blue-600 text-blue-200';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => !submittedQuiz && setSelectedOption(idx)}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-colors flex items-center justify-between ${bgClass}`}
                  >
                    <span>{opt}</span>
                    {submittedQuiz && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {submittedQuiz && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleQuizSubmit}
                disabled={submittedQuiz}
                className="px-3.5 py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs disabled:opacity-50 transition-colors"
              >
                Submit Answer
              </button>

              {submittedQuiz && (
                <button
                  onClick={() => navigate('/problem/03-valid-parentheses')}
                  className="px-3.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs border border-zinc-700 flex items-center gap-1.5 transition-colors font-mono"
                >
                  <span>Return to Code Editor</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
