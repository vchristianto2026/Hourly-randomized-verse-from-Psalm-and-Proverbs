import React from 'react';
import { Verse, Language, BookSource } from '../types/verse';
import { Clock, X, Sparkles, BookOpen } from 'lucide-react';

interface TimelineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  verses: Verse[];
  currentHour: number;
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  language: Language;
}

export const TimelineDrawer: React.FC<TimelineDrawerProps> = ({
  isOpen,
  onClose,
  verses,
  currentHour,
  selectedHour,
  onSelectHour,
  language,
}) => {
  const [filter, setFilter] = React.useState<BookSource | 'all'>('all');

  if (!isOpen) return null;

  // Map 24 hours
  const hours = Array.from({ length: 24 }).map((_, h) => {
    const verseForHour = verses.find(v => v.defaultHour === h) || verses[h % verses.length];
    return {
      hour: h,
      verse: verseForHour,
      isNow: h === currentHour,
      isSelected: h === selectedHour,
    };
  });

  const filteredHours = filter === 'all' 
    ? hours 
    : hours.filter(h => h.verse.book === filter);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-stone-200 bg-white shadow-2xl transition-all dark:border-stone-800 dark:bg-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 p-5 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                24-Hour Scripture Cycle
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Browse verses assigned across every hour of the day
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

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 border-b border-stone-100 px-5 py-3 dark:border-stone-800 text-xs">
          {[
            { id: 'all', label: 'All 24 Hours' },
            { id: 'proverbs', label: 'Proverbs' },
            { id: 'psalms', label: 'Psalms' },
            { id: 'john', label: 'Gospel of John' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as BookSource | 'all')}
              className={`rounded-lg px-2.5 py-1 font-medium transition ${
                filter === f.id
                  ? 'bg-amber-500/15 text-amber-700 font-semibold dark:text-amber-300'
                  : 'text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Hour Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredHours.map(({ hour, verse, isNow, isSelected }) => {
            const verseText = language === 'zh' ? verse.text.zh : language === 'fr' ? verse.text.fr : verse.text.en;
            const verseRef = language === 'zh' ? verse.reference.zh : language === 'fr' ? verse.reference.fr : verse.reference.en;

            return (
              <div
                key={hour}
                onClick={() => {
                  onSelectHour(hour);
                  onClose();
                }}
                className={`group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-all ${
                  isSelected
                    ? 'border-amber-500/60 bg-amber-500/10 shadow-sm'
                    : isNow
                    ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60'
                    : 'border-stone-100 bg-stone-50/50 hover:border-stone-200 hover:bg-white dark:border-stone-800 dark:bg-stone-800/30 dark:hover:bg-stone-800/70'
                }`}
              >
                {/* Hour Badge */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-11 items-center justify-center rounded-xl font-mono text-xs font-bold transition ${
                    isNow 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : isSelected 
                      ? 'bg-amber-500 text-stone-950 font-bold' 
                      : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                  }`}>
                    {String(hour).padStart(2, '0')}:00
                  </div>
                  {isNow && (
                    <span className="mt-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                      LIVE
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      {verseRef}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-amber-600 dark:text-amber-400">
                      {verse.bookName.en}
                    </span>
                  </div>

                  <p className={`mt-1 line-clamp-2 text-xs text-stone-600 dark:text-stone-300 ${
                    language === 'zh' ? 'font-serif-chinese' : 'font-serif-verse italic'
                  }`}>
                    "{verseText}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 p-4 dark:border-stone-800 text-center">
          <button
            onClick={() => {
              onSelectHour(currentHour);
              onClose();
            }}
            className="w-full rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            Jump to Current Hour ({String(currentHour).padStart(2, '0')}:00)
          </button>
        </div>
      </div>
    </div>
  );
};
