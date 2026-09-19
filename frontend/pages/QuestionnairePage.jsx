import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sliders
} from 'lucide-react';
import { ONBOARDING_QUESTIONS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const QuestionnairePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    skillLevel: 'Intermediate',
    language: 'Python',
    goal: 'interview',
    dailyCommitment: '30m'
  });

  const navigate = useNavigate();
  const { savePreferences } = useAuth();
  const { addToast } = useToast();

  const totalSteps = ONBOARDING_QUESTIONS.length + 1;
  const question = ONBOARDING_QUESTIONS[currentStep];

  const handleSelectOption = (key, val) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      savePreferences(answers);
      addToast('Preferences Saved!', 'success');
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col justify-center items-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-lg bg-[#121215] border border-[#27272A] rounded p-6 shadow-2xl">
        
        {/* Step Indicator & Progress Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Sliders className="w-3.5 h-3.5" /> Setup Preferences
            </span>
            <span>Step {currentStep + 1} of {totalSteps}</span>
          </div>

          <div className="w-full bg-[#09090B] rounded-full h-1 overflow-hidden border border-[#27272A]">
            <motion.div
              className="bg-zinc-100 h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        {/* Dynamic Question / Summary Content */}
        <AnimatePresence mode="wait">
          {currentStep < ONBOARDING_QUESTIONS.length ? (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-base font-bold font-outfit text-white">{question.title}</h2>
                <p className="text-xs text-zinc-400 mt-0.5 font-sans">{question.subtitle}</p>
              </div>

              <div className="space-y-2 font-sans">
                {question.options.map((opt) => {
                  const isSelected = answers[question.id] === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => handleSelectOption(question.id, opt.value)}
                      className={`p-3 rounded border cursor-pointer transition-colors flex items-start gap-3 ${
                        isSelected
                          ? 'bg-zinc-800 border-zinc-600 text-white'
                          : 'bg-[#09090B] border-[#27272A] hover:border-zinc-700'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-zinc-100 border-white text-zinc-950' : 'border-zinc-700 bg-zinc-900'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-zinc-100">{opt.title}</span>
                        <span className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{opt.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Summary Final Step */
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4 py-2"
            >
              <div>
                <h2 className="text-base font-bold font-outfit text-white">Preferences Configured</h2>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  VizStruct is calibrated for your chosen language and learning goal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left font-mono text-xs">
                <div className="p-2.5 rounded bg-[#09090B] border border-[#27272A]">
                  <span className="text-[9px] text-zinc-500 uppercase">Proficiency</span>
                  <p className="text-xs font-bold text-zinc-200 mt-0.5">{answers.skillLevel}</p>
                </div>
                <div className="p-2.5 rounded bg-[#09090B] border border-[#27272A]">
                  <span className="text-[9px] text-zinc-500 uppercase">Language</span>
                  <p className="text-xs font-bold text-blue-400 mt-0.5">{answers.language}</p>
                </div>
                <div className="p-2.5 rounded bg-[#09090B] border border-[#27272A]">
                  <span className="text-[9px] text-zinc-500 uppercase">Goal</span>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5 capitalize">{answers.goal}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>{currentStep === totalSteps - 1 ? 'Go to Dashboard' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
