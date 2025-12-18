import React from 'react';
import { Trophy, Share2, Coins } from 'lucide-react';
import { TestQuestion } from '../types';

interface ResultsViewProps {
  score: number;
  total: number;
  isQuick: boolean;
  activeTest: TestQuestion[];
  onContinue: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ score, total, isQuick, activeTest, onContinue }) => {
  const shareDeck = () => {
    const deckData = activeTest.map(q => ({ arabic: q.question, english: q.answer }));
    const encoded = btoa(JSON.stringify(deckData));
    const url = `${window.location.origin}${window.location.pathname}#deck=${encoded}`;
    navigator.clipboard.writeText(url);
    alert("ممتاز! Share link copied to clipboard.");
  };

  return (
    <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 to-emerald-700 opacity-50" />
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mb-8 shadow-inner animate-bounce">
          <Trophy size={56} className="text-white drop-shadow-lg" />
        </div>
        <h2 className="text-5xl font-black mb-3 leading-none">ممتاز!</h2>
        <p className="text-emerald-100/70 font-bold mb-12 tracking-wide uppercase text-xs">Result: {score}/{total} Correct</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
            <div className="text-3xl font-black">+{score * 20}</div>
            <div className="text-[10px] font-black uppercase opacity-60 tracking-widest">XP</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black">+10</span>
              <Coins size={20} className="text-amber-400" />
            </div>
            <div className="text-[10px] font-black uppercase opacity-60 tracking-widest">Bonus</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={onContinue}
            className="w-full bg-white text-emerald-950 font-black py-6 rounded-[2rem] shadow-2xl active:scale-95 transition-transform"
          >
            {isQuick ? "Save Progress & Continue" : "Return to Base"}
          </button>
          {isQuick && (
            <button 
              onClick={shareDeck}
              className="w-full bg-emerald-700/50 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-2 border border-white/10 hover:bg-emerald-700 transition-colors"
            >
              <Share2 size={18} /> Share Mini-Deck
            </button>
          )}
        </div>
      </div>
    </div>
  );
};