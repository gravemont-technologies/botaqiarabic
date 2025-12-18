import React, { useState, useEffect } from 'react';
import { View, UserProfile, Word, TestQuestion } from './types';
import { generateQuickDeck } from './lib/ai';
import { LandingPage } from './pages/LandingPage';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';

const INITIAL_WORDS: Word[] = [
  { id: '1', arabic: 'مرحباً', transliteration: 'Marhaban', english: 'Hello', category: 'Greetings', mastery: 10 },
  { id: '2', arabic: 'شكراً', transliteration: 'Shukran', english: 'Thank you', category: 'Greetings', mastery: 30 },
];

export const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('botaqiy_user');
    return saved ? JSON.parse(saved) : { name: '', coins: 100, streak: 0, level: 1, xp: 0, goal: '' };
  });
  const [words, setWords] = useState<Word[]>(() => {
    const saved = localStorage.getItem('botaqiy_words');
    return saved ? JSON.parse(saved) : INITIAL_WORDS;
  });

  const [activeTest, setActiveTest] = useState<TestQuestion[]>([]);
  const [testScore, setTestScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isQuickTest, setIsQuickTest] = useState(false);

  useEffect(() => {
    localStorage.setItem('botaqiy_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('botaqiy_words', JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#deck=')) {
        try {
          const encoded = hash.replace('#deck=', '');
          const decoded = JSON.parse(atob(encoded));
          if (Array.isArray(decoded)) {
            startQuiz(decoded, true);
          }
        } catch (e) {
          console.error("Hash decode failed", e);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const startQuiz = (wordList: { arabic: string; english: string }[], quick = false) => {
    const questions: TestQuestion[] = wordList.map(w => {
      const others = wordList.filter(x => x.english !== w.english).map(x => x.english);
      const noise = ["Book", "School", "Water", "Light", "Friend", "Family", "City", "Road"];
      const options = [w.english, ...others, ...noise].slice(0, 4).sort(() => Math.random() - 0.5);
      return { question: w.arabic, answer: w.english, options, type: 'translate' };
    });
    setActiveTest(questions);
    setIsQuickTest(quick);
    setView('test');
  };

  const handleQuickGenerate = async (userInput: string) => {
    setLoading(true);
    try {
      const data = await generateQuickDeck(userInput);
      if (data.deck) startQuiz(data.deck, true);
    } catch (e) {
      console.error(e);
      startQuiz([{ arabic: userInput, english: 'Concept' }], true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {view === 'landing' && <LandingPage onQuickTry={handleQuickGenerate} loading={loading} />}
      {view === 'test' && (
        <QuizView 
          questions={activeTest} 
          onComplete={(score) => {
            setTestScore(score);
            setView('results');
          }} 
          onCancel={() => setView('landing')}
        />
      )}
      {view === 'results' && (
        <ResultsView 
          score={testScore} 
          total={activeTest.length} 
          isQuick={isQuickTest}
          activeTest={activeTest}
          onContinue={() => {
            if (isQuickTest) {
              setUser(prev => ({ ...prev, coins: prev.coins + 10 }));
              setView('onboarding');
            } else {
              setView('dashboard');
            }
          }}
        />
      )}
      {view === 'onboarding' && (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-black mb-4">Choose Your Path</h2>
          <p className="text-slate-500 mb-8">Lock in your rewards and start learning for real.</p>
          <button onClick={() => setView('landing')} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold">Restart Journey</button>
        </div>
      )}
    </>
  );
};