import React, { useState } from 'react';
import { Zap, Loader2, ArrowRight } from 'lucide-react';

interface QuickTryWidgetProps {
  onGenerate: (word: string) => void;
  loading: boolean;
}

export const QuickTryWidget: React.FC<QuickTryWidgetProps> = ({ onGenerate, loading }) => {
  const [inputWord, setInputWord] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputWord.trim() && !loading) {
      onGenerate(inputWord.trim());
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl relative transition-all hover:bg-white/[0.07]">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
        <Zap size={10} fill="currentColor"/> Instant Lab
      </div>
      
      <h3 className="text-sm font-bold text-emerald-400 mb-6 mt-2 tracking-tight">Type a word to start learning</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input 
          dir="rtl"
          autoFocus
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder="مثلاً: سفر"
          className="w-full bg-white/10 border border-white/10 p-5 rounded-2xl text-center text-4xl font-black font-arabic outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/10"
        />
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">AI will build a 3-card deck for you</p>
      </form>

      <button 
        disabled={loading || !inputWord.trim()}
        onClick={handleSubmit}
        className="w-full bg-white text-emerald-950 font-black py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Crafting...
          </>
        ) : (
          <>
            Practice Now <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
};