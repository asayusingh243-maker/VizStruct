import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  ArrowLeft, 
  Code2, 
  Terminal,
  Info
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { ControlBar } from '../components/visualizer/ControlBar';
import { ArrayVisualizer } from '../components/visualizer/ArrayVisualizer';
import { VariableTable } from '../components/visualizer/VariableTable';
import { StackVisualizer } from '../components/visualizer/StackVisualizer';
import { MOCK_EXECUTION_TRACES } from '../data/mockData';

export const VisualizerPage = () => {
  const navigate = useNavigate();
  const traceData = MOCK_EXECUTION_TRACES['01-bubble-sort'];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const totalSteps = traceData.steps.length;
  const currentStep = traceData.steps[currentStepIndex];

  // Auto-play stepper timer effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex < totalSteps - 1) {
            return prevIndex + 1;
          } else {
            setIsPlaying(false);
            return prevIndex;
          }
        });
      }, 1000 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, totalSteps]);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
          
          {/* Visualizer Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#121215] p-3.5 rounded border border-[#27272A]">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-zinc-800 text-blue-400 border border-zinc-700">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold font-mono text-white">
                  Debugger Workspace // {traceData.algorithmName}
                </h1>
                <p className="text-[11px] text-zinc-400 mt-0.5 font-sans">
                  Interactive step execution &amp; memory state inspector
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/problems')}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-medium text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Problems</span>
            </button>
          </div>

          {/* Trace Explanation Banner */}
          <div className="p-3.5 rounded bg-[#121215] border border-[#27272A] flex items-start gap-3 font-mono text-xs">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-zinc-200">
                Step {currentStepIndex + 1}: {currentStep.explanation}
              </div>
              {currentStep.stdout && (
                <div className="text-[11px] text-zinc-400 font-mono">
                  stdout: <span className="text-emerald-400">{currentStep.stdout}</span>
                </div>
              )}
            </div>
          </div>

          {/* Visualizer Layout Shell */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Code View (5 cols) */}
            <div className="lg:col-span-5 bg-[#121215] rounded border border-[#27272A] p-4 flex flex-col min-h-[350px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A] mb-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-zinc-200">Execution Code View</span>
                </div>
                <span className="text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-800 text-[10px]">
                  Line {currentStep.line}
                </span>
              </div>

              <div className="flex-1 bg-[#09090B] rounded p-3 font-mono text-xs space-y-1 border border-[#27272A] overflow-y-auto">
                {traceData.codeLines.map((lineText, idx) => {
                  const lineNum = idx + 1;
                  const isExecuting = lineNum === currentStep.line;
                  return (
                    <div
                      key={lineNum}
                      className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                        isExecuting
                          ? 'bg-blue-950/80 text-blue-200 border-l-2 border-blue-500 font-bold'
                          : 'text-zinc-400'
                      }`}
                    >
                      <span className="w-6 text-right text-zinc-600 select-none text-[11px]">{lineNum}</span>
                      <span className="whitespace-pre">{lineText}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* State Inspector Panels (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Array / Structure Panel */}
              <div className="min-h-[200px]">
                <ArrayVisualizer
                  array={currentStep.arrayState}
                  highlightIndices={currentStep.highlightIndices || []}
                  status={currentStep.status || 'normal'}
                />
              </div>

              {/* Grid: Variable Inspector + Call Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VariableTable variables={currentStep.variables || {}} />
                <StackVisualizer stackFrames={currentStep.stackFrames || []} />
              </div>

            </div>

          </div>

          {/* Stepper Control Bar */}
          <ControlBar
            currentStep={currentStepIndex + 1}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            speed={speed}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={() => currentStepIndex < totalSteps - 1 && setCurrentStepIndex(prev => prev + 1)}
            onPrev={() => currentStepIndex > 0 && setCurrentStepIndex(prev => prev - 1)}
            onReset={() => { setIsPlaying(false); setCurrentStepIndex(0); }}
            onSpeedChange={setSpeed}
            onSeek={(step) => setCurrentStepIndex(step - 1)}
          />

        </main>
      </div>
    </div>
  );
};
