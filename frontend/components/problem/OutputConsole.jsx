import React, { useState } from 'react';
import { Terminal, Play, Send, CheckCircle2, XCircle, Clock, Cpu, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OutputConsole = ({
  customInput,
  setCustomInput,
  output,
  isRunning,
  onRun,
  onSubmit,
  problemId
}) => {
  const [activeTab, setActiveTab] = useState('testcase'); // 'testcase' | 'result'
  const navigate = useNavigate();

  return (
    <div className="bg-[#1E293B] rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full">
      {/* Console Header Tabs */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('testcase')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'testcase'
                ? 'bg-slate-800 text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Testcase
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'result'
                ? 'bg-slate-800 text-purple-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Execution Result
            {output?.status && (
              <span className={`w-2 h-2 rounded-full ${output.status === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={onSubmit}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit</span>
          </button>

          <button
            onClick={() => navigate('/visualizer')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
            title="Step-by-step visual trace"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visualize Trace</span>
          </button>
        </div>
      </div>

      {/* Console Tab Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === 'testcase' ? (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 block">Custom Input Params:</label>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              rows={3}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="e.g. nums = [5, 1, 4, 2, 8]"
            />
          </div>
        ) : (
          <div>
            {!output ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-500 text-xs">
                <Terminal className="w-8 h-8 text-slate-600 mb-2 opacity-50" />
                <span>Run or submit your code to see execution logs & testcase results</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {output.status === 'Accepted' ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accepted</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-sm">
                        <XCircle className="w-4 h-4" />
                        <span>{output.status || 'Wrong Answer'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> {output.runtime || '18ms'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" /> {output.memory || '14.1 MB'}
                    </span>
                  </div>
                </div>

                {/* Stdout Logs */}
                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Console Output</div>
                  <pre className="text-slate-200 whitespace-pre-wrap">{output.stdout || 'No stdout printed.'}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
