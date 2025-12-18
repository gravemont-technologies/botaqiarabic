import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
import { TestQuestion } from '../types';

interface QuizViewProps {
  questions: TestQuestion[];
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);

  const question = questions[currentStep];

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore(prev => prev + 1);
    setShowCorrection(true);
  };

  const nextStep = () => {
    setSelected(null);
    setShowCorrection(false);
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  if (!question) return null;

  return (
    <div className="min-h-screen bg-white p-8 max-w-lg mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-12">
        <button onClick={onCancel} className="p-2 transition-colors hover:bg-slate-50 rounded-full"><XCircle className="text-slate-300"/></button>
        <div className="flex-grow mx-6 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs font-black text-slate-300 tracking-tighter">{currentStep + 1} / {questions.length}</span>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 tracking-widest">Challenge</h2>
        <div className="text-7xl font-black font-arabic mb-16 leading-tight" dir="rtl">{question.question}</div>
        
        <div className="grid grid-cols-1 gap-4 w-full">
          {question.options.map(opt => {
            let btnClass = "w-full p-6 rounded-[2rem] border-2 text-base font-bold transition-all transform active:scale-[0.98] ";
            if (selected === opt) {
              btnClass += opt === question.answer ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20" : "bg-red-500 border-red-500 text-white shadow-xl shadow-red-500/20";
            } else if (showCorrection && opt === question.answer) {
              btnClass += "border-emerald-500 text-emerald-600";
            } else {
              btnClass += "border-slate-50 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-slate-100";
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)} className={btnClass}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 h-20 flex items-center">
        {showCorrection && (
          <button 
            onClick={nextStep}
            className="w-full bg-slate-900 text-white font-black py-6 rounded-[2rem] shadow-2xl"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};