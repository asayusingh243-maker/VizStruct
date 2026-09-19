import React from 'react';
import Editor from '@monaco-editor/react';
import { Code2, RotateCcw, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const CodeEditor = ({
  code,
  onChange,
  language = 'python',
  onLanguageChange,
  onReset,
  highlightLine = null
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditorMount = (editor, monaco) => {
    // Add custom styling or keybindings if needed
  };

  return (
    <div className="bg-[#1E293B] rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          
          <select
            value={language}
            onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
            className="bg-zinc-800 text-xs font-mono text-zinc-200 border border-zinc-700/60 rounded px-2.5 py-1 focus:outline-none focus:border-blue-500"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (ES6)</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++ 17</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1 transition-colors"
              title="Reset boilerplate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 min-h-[350px] relative">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language}
          value={code}
          theme="vs-dark"
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorMount}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            lineNumbers: 'on',
            roundedSelection: true,
            padding: { top: 12, bottom: 12 },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            renderLineHighlight: 'all',
          }}
        />
      </div>
    </div>
  );
};
