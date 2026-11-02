import React, { useState, useEffect } from 'react';
import { Verse, Language } from '../types/verse';
import { createScrambleTokens } from '../utils/verseEngine';
import { X, RefreshCw, CheckCircle, Lightbulb, Sparkles, Volume2 } from 'lucide-react';
import { speakVerseText } from '../utils/verseEngine';

interface VerseUnscrambleModalProps {
  verse: Verse;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const VerseUnscrambleModal: React.FC<VerseUnscrambleModalProps> = ({
  verse,
  language,
  isOpen,
  onClose,
}) => {
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [tokens, setTokens] = useState<{ id: string; text: string; correctIndex: number }[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<{ id: string; text: string; correctIndex: number }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const getSourceText = () => {
    if (activeLang === 'zh') return verse.text.zh;
    if (activeLang === 'fr') return verse.text.fr;
    return verse.text.en;
  };

  const getRef = () => {
    if (activeLang === 'zh') return verse.reference.zh;
    if (activeLang === 'fr') return verse.reference.fr;
    return verse.reference.en;
  };

  const resetPuzzle = () => {
    const rawText = getSourceText();
    const scrambled = createScrambleTokens(rawText, activeLang);
    setTokens(scrambled);
    setSelectedTokens([]);
    setIsCompleted(false);
    setShowHint(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetPuzzle();
    }
  }, [isOpen, verse, activeLang]);

  if (!isOpen) return null;

  const handlePickToken = (token: { id: string; text: string; correctIndex: number }) => {
    if (isCompleted) return;

    // Check if clicked token is next in order
    const nextExpectedIndex = selectedTokens.length;
    if (token.correctIndex === nextExpectedIndex) {
      const nextSelected = [...selectedTokens, token];
      setSelectedTokens(nextSelected);
      setTokens(prev => prev.filter(t => t.id !== token.id));

      if (nextSelected.length === tokens.length + selectedTokens.length) {
        setIsCompleted(true);
      }
    } else {
      // Soft incorrect shake effect or hint
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    }
  };

  const handleRemoveToken = (token: { id: string; text: string; correctIndex: number }) => {
    // Only allow popping the last token
    if (selectedTokens.length > 0 && selectedTokens[selectedTokens.length - 1].id === token.id) {
      setSelectedTokens(prev => prev.slice(0, -1));
      setTokens(prev => [...prev, token]);
      setIsCompleted(false);
    }
  };

  const handleAutoComplete = () => {
    const all = [...tokens, ...selectedTokens].sort((a, b) => a.correctIndex - b.correctIndex);
    setSelectedTokens(all);
    setTokens([]);
    setIsCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl transition-all dark:border-stone-800 dark:bg-stone-900 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Scripture Contemplation & Unscramble
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {verse.bookName.en} • {getRef()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5 rounded-xl bg-stone-100 p-1 dark:bg-stone-800 text-xs font-medium">
            <button
              onClick={() => setActiveLang('en')}
              className={`rounded-lg px-3 py-1 transition ${
                activeLang === 'en'
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLang('zh')}
              className={`rounded-lg px-3 py-1 transition ${
                activeLang === 'zh'
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
              }`}
            >
              繁體中文
            </button>
            <button
              onClick={() => setActiveLang('fr')}
              className={`rounded-lg px-3 py-1 transition ${
                activeLang === 'fr'
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
              }`}
            >
              Français
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => speakVerseText(getSourceText(), activeLang)}
              className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              title="Listen aloud"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <button
              onClick={resetPuzzle}
              className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              title="Re-scramble words"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Assembly Area (Constructed Verse) */}
        <div className="mt-4 min-h-[100px] rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/70 p-4 transition dark:border-stone-800 dark:bg-stone-950/60">
          <div className="text-[11px] font-medium uppercase tracking-wider text-stone-400 mb-2">
            Reconstructed Scripture:
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {selectedTokens.length === 0 ? (
              <span className="text-xs italic text-stone-400">
                Tap words below in order to unscramble and meditate on this verse...
              </span>
            ) : (
              selectedTokens.map(token => (
                <button
                  key={token.id}
                  onClick={() => handleRemoveToken(token)}
                  className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-900 transition hover:bg-amber-500/25 dark:text-amber-200"
                  title="Click to remove last word"
                >
                  {token.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Scrambled Word Bank */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
              Scrambled Words ({tokens.length} remaining):
            </span>
            {showHint && (
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 animate-pulse">
                Try the word that begins the next phrase!
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tokens.map(token => (
              <button
                key={token.id}
                onClick={() => handlePickToken(token)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-amber-500 dark:hover:bg-stone-700"
              >
                {token.text}
              </button>
            ))}
          </div>
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center dark:bg-emerald-950/30">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle className="h-5 w-5" />
              <span>Beautifully Contemplated & Completed!</span>
            </div>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              May this Word dwell richly in your heart throughout this hour.
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
          <button
            onClick={handleAutoComplete}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            Reveal Verse
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
