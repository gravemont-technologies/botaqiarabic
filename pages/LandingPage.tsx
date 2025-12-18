import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { QuickTryWidget } from '../components/QuickTryWidget';

interface LandingPageProps {
  onQuickTry: (word: string) => void;
  loading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onQuickTry, loading }) => {
  return (
    <div className="min-h-screen bg-emerald-950 text-white flex flex-col p-6 overflow-y-auto selection:bg-emerald-500/30">
      <div className="flex-grow flex flex-col items-center justify-center text-center py-10">
        <div className="w-16 h-16 bg-emerald-500 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/20">
          <GraduationCap size={32} />
        </div>
        <h1 className="text-5xl font-black mb-2 tracking-tight">Botaqiy</h1>
        <p className="text-emerald-200/70 text-lg mb-12 max-w-xs font-medium leading-relaxed">
          Master Arabic through AI-powered contextual loops.
        </p>
        
        <QuickTryWidget onGenerate={onQuickTry} loading={loading} />

        <div className="mt-12">
          <button 
            className="text-emerald-400 font-bold flex items-center gap-2 hover:text-white transition-colors text-sm"
          >
            Or browse the full path <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-[10px] text-emerald-500/20 uppercase tracking-[0.4em] text-center font-bold py-6">
        No Signup Required • Powered by Gemini
      </div>
    </div>
  );
};