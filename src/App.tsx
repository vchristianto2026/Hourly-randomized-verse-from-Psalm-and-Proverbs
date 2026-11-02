/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { VERSES_DATABASE, SOURCE_LINKS } from './data/versesData';
import { Verse, Language, BookSource } from './types/verse';
import { 
  getHourlyVerse, 
  getCountdownToNextHour, 
  scrambleVerse, 
  speakVerseText, 
  stopSpeaking 
} from './utils/verseEngine';
import { usePushNotifications } from './hooks/usePushNotifications';
import { WidgetStudio } from './components/WidgetStudio';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { VerseUnscrambleModal } from './components/VerseUnscrambleModal';
import { TimelineDrawer } from './components/TimelineDrawer';
import { ShareCardModal } from './components/ShareCardModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  Shuffle, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Clock, 
  Bell, 
  BellRing,
  Sparkles, 
  RotateCcw, 
  ExternalLink, 
  Smartphone, 
  Sun, 
  Moon, 
  BookOpen, 
  ChevronRight,
  Maximize2,
  Heart,
  Type
} from 'lucide-react';

export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeVerse, setActiveVerse] = useState<Verse>(() => getHourlyVerse(new Date(), VERSES_DATABASE));
  const [isCustomScrambled, setIsCustomScrambled] = useState(false);
  const [selectedBookFilter, setSelectedBookFilter] = useState<BookSource | 'all'>('all');
  
  // Display settings
  const [displayMode, setDisplayMode] = useState<'trilingual' | 'en' | 'zh' | 'fr'>('trilingual');
  const [theme, setTheme] = useState<'midnight' | 'parchment' | 'light'>('midnight');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals & Panels
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showUnscrambleModal, setShowUnscrambleModal] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'widget-studio' | 'favorites'>('sanctuary');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hourly_quote_favorites_v1');
      return saved ? JSON.parse(saved) : ['psalm-23-1-3', 'proverbs-3-5-6', 'john-3-16'];
    } catch {
      return ['psalm-23-1-3'];
    }
  });

  // Push notifications hook
  const {
    permission,
    settings,
    setSettings,
    requestPermission,
    sendTestNotification,
    checkHourlyTick,
  } = usePushNotifications();

  // Real-time Clock & Hourly Tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      // Hourly trigger check for notifications & auto-advancing verse
      checkHourlyTick(() => getHourlyVerse(now, VERSES_DATABASE));

      // Auto update if not manually scrambled
      if (!isCustomScrambled && now.getMinutes() === 0 && now.getSeconds() === 0) {
        setActiveVerse(getHourlyVerse(now, VERSES_DATABASE));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCustomScrambled, checkHourlyTick]);

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem('hourly_quote_favorites_v1', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const countdown = useMemo(() => getCountdownToNextHour(currentDate), [currentDate]);

  // Scramble action
  const handleScramble = (filter = selectedBookFilter) => {
    const next = scrambleVerse(VERSES_DATABASE, activeVerse.id, filter);
    setActiveVerse(next);
    setIsCustomScrambled(true);
    stopSpeaking();
    setIsSpeaking(false);
  };

  // Reset to current hour
  const handleResetToCurrentHour = () => {
    const hourly = getHourlyVerse(currentDate, VERSES_DATABASE);
    setActiveVerse(hourly);
    setIsCustomScrambled(false);
    stopSpeaking();
    setIsSpeaking(false);
  };

  // Toggle favorite
  const handleToggleFavorite = (verseId: string) => {
    setFavorites(prev => 
      prev.includes(verseId) ? prev.filter(id => id !== verseId) : [...prev, verseId]
    );
  };

  // Speech handler
  const handleSpeak = async (lang: Language) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const textToSpeak = lang === 'zh' 
      ? activeVerse.text.zh 
      : lang === 'fr' 
      ? activeVerse.text.fr 
      : activeVerse.text.en;

    try {
      await speakVerseText(textToSpeak, lang);
    } finally {
      setIsSpeaking(false);
    }
  };

  const isFavorite = favorites.includes(activeVerse.id);

  // Theme styles
  const themeClasses = useMemo(() => {
    if (theme === 'midnight') {
      return {
        bg: 'bg-stone-950 text-stone-100',
        card: 'bg-stone-900/80 border-stone-800 text-stone-100 shadow-2xl shadow-black/60',
        cardSub: 'bg-stone-950/60 border-stone-800/80',
        accent: 'text-amber-400',
        accentBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        secondaryText: 'text-stone-400',
        border: 'border-stone-800',
      };
    }
    if (theme === 'parchment') {
      return {
        bg: 'bg-[#f7f3e8] text-stone-900',
        card: 'bg-[#fffdf9] border-amber-900/15 text-stone-900 shadow-xl shadow-stone-300/40',
        cardSub: 'bg-[#f4efe4] border-amber-900/10',
        accent: 'text-amber-800',
        accentBg: 'bg-amber-900/10 text-amber-900 border-amber-900/20',
        secondaryText: 'text-stone-600',
        border: 'border-amber-900/15',
      };
    }
    // Minimalist light
    return {
      bg: 'bg-stone-50 text-stone-900',
      card: 'bg-white border-stone-200 text-stone-900 shadow-xl shadow-stone-200/50',
      cardSub: 'bg-stone-50 border-stone-200',
      accent: 'text-amber-600',
      accentBg: 'bg-amber-50 text-amber-700 border-amber-200',
      secondaryText: 'text-stone-500',
      border: 'border-stone-200',
    };
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col font-sans ${themeClasses.bg}`}>
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 border-b border-stone-200/20 bg-stone-950/80 backdrop-blur-md dark:border-stone-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-md">
              🕊️
            </span>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                Hourly quote of the day from Psalms and Proverbs.
              </h1>
              <p className="text-[11px] text-stone-400">
                Psalms • Proverbs • Gospel of John (NKJV)
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            {/* PWA Install */}
            <PWAInstallButton />

            {/* Notifications Button */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className={`relative flex h-8 w-8 items-center justify-center rounded-xl border transition ${
                settings.enabled
                  ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                  : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-white'
              }`}
              title="Push Notification Settings"
            >
              {settings.enabled ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
              {settings.enabled && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-stone-950" />
              )}
            </button>

            {/* 24-Hour Timeline */}
            <button
              onClick={() => setShowTimeline(true)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-700 bg-stone-900 text-stone-400 hover:text-white transition"
              title="24-Hour Timeline"
            >
              <Clock className="h-4 w-4" />
            </button>

            {/* Theme Toggle */}
            <div className="flex items-center rounded-xl border border-stone-700 bg-stone-900 p-0.5">
              <button
                onClick={() => setTheme('midnight')}
                className={`rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                  theme === 'midnight' ? 'bg-stone-800 text-amber-400' : 'text-stone-400'
                }`}
                title="Midnight Dark"
              >
                <Moon className="h-3 w-3" />
              </button>
              <button
                onClick={() => setTheme('parchment')}
                className={`rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                  theme === 'parchment' ? 'bg-stone-800 text-amber-400' : 'text-stone-400'
                }`}
                title="Warm Parchment"
              >
                📜
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                  theme === 'light' ? 'bg-stone-800 text-amber-400' : 'text-stone-400'
                }`}
                title="Minimalist Light"
              >
                <Sun className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-5xl items-center justify-between border-t border-stone-800/60 px-4 py-1.5 sm:px-6 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('sanctuary')}
              className={`rounded-lg px-3 py-1 font-medium transition ${
                activeTab === 'sanctuary'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Quote Sanctuary
            </button>
            <button
              onClick={() => setActiveTab('widget-studio')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-medium transition ${
                activeTab === 'widget-studio'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5 text-amber-400" />
              <span>Widget Studio (iOS & Android)</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1 font-medium transition ${
                activeTab === 'favorites'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Bookmark className="h-3 w-3" />
              <span>Saved ({favorites.length})</span>
            </button>
          </div>

          {/* Hourly Countdown Badge */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Next verse:</span>
            <span className="font-mono font-semibold text-amber-400">{countdown.formatted}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        {/* TAB 1: SANCTUARY (Main Quote View) */}
        {activeTab === 'sanctuary' && (
          <div className="space-y-6">
            {/* Top Bar with Book Filters & Countdown */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Book Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mr-1">
                  Source:
                </span>
                {[
                  { id: 'all', label: 'All Sources' },
                  { id: 'psalms', label: 'Psalms', url: SOURCE_LINKS.psalms },
                  { id: 'proverbs', label: 'Proverbs', url: SOURCE_LINKS.proverbs },
                  { id: 'john', label: 'Gospel of John', url: SOURCE_LINKS.john },
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBookFilter(b.id as BookSource | 'all');
                      handleScramble(b.id as BookSource | 'all');
                    }}
                    className={`rounded-full px-3 py-1 font-medium transition ${
                      selectedBookFilter === b.id
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                        : 'border border-stone-200/60 bg-white/40 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:bg-stone-800'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Status & Hour Indicator */}
              <div className="flex items-center gap-2 text-xs">
                {isCustomScrambled ? (
                  <button
                    onClick={handleResetToCurrentHour}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 transition"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Return to Current Hour ({currentDate.getHours()}:00)</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Hour {String(currentDate.getHours()).padStart(2, '0')}:00 Verse</span>
                  </div>
                )}
              </div>
            </div>

            {/* THE MAIN SCRIPTURE CARD */}
            <div className={`relative rounded-3xl border p-6 sm:p-10 transition-all ${themeClasses.card}`}>
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/40 pb-5 dark:border-stone-800/80">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-xl bg-amber-500/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {activeVerse.bookName.en.toUpperCase()}
                  </span>
                  <span className="text-xs font-medium text-stone-400">
                    • {activeVerse.themeLabel.en}
                  </span>
                </div>

                {/* Right controls: Language views & font size */}
                <div className="flex items-center gap-2">
                  {/* Trilingual vs Single Language Switcher */}
                  <div className="flex rounded-xl border border-stone-200 bg-stone-100/70 p-0.5 text-xs font-medium dark:border-stone-800 dark:bg-stone-900/60">
                    <button
                      onClick={() => setDisplayMode('trilingual')}
                      className={`rounded-lg px-2.5 py-1 transition ${
                        displayMode === 'trilingual'
                          ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white'
                          : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                      }`}
                    >
                      Trilingual
                    </button>
                    <button
                      onClick={() => setDisplayMode('en')}
                      className={`rounded-lg px-2.5 py-1 transition ${
                        displayMode === 'en'
                          ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white'
                          : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setDisplayMode('zh')}
                      className={`rounded-lg px-2.5 py-1 transition ${
                        displayMode === 'zh'
                          ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white'
                          : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                      }`}
                    >
                      繁中
                    </button>
                    <button
                      onClick={() => setDisplayMode('fr')}
                      className={`rounded-lg px-2.5 py-1 transition ${
                        displayMode === 'fr'
                          ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white'
                          : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                      }`}
                    >
                      FR
                    </button>
                  </div>

                  {/* Font Size Adjust */}
                  <div className="flex items-center rounded-xl border border-stone-200 bg-stone-100/70 p-0.5 text-xs dark:border-stone-800 dark:bg-stone-900/60">
                    <button
                      onClick={() => setFontSizeMultiplier(prev => Math.max(0.85, prev - 0.1))}
                      className="px-2 py-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                      title="Smaller text"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSizeMultiplier(prev => Math.min(1.35, prev + 0.1))}
                      className="px-2 py-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white font-bold"
                      title="Larger text"
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body: Scripture Text Display */}
              <div className="py-8 space-y-7">
                {/* 1. English (NKJV) */}
                {(displayMode === 'trilingual' || displayMode === 'en') && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-500/90 dark:text-amber-400/90 mb-2">
                      <span className="flex items-center gap-1.5">
                        <span>English (NKJV)</span>
                        <a
                          href={activeVerse.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="opacity-60 hover:opacity-100"
                          title="View on Bible source"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">
                        {activeVerse.reference.en}
                      </span>
                    </div>

                    <blockquote
                      className="font-serif-verse italic leading-relaxed text-stone-900 dark:text-stone-50 select-text"
                      style={{ fontSize: `${2.1 * fontSizeMultiplier}rem` }}
                    >
                      "{activeVerse.text.en}"
                    </blockquote>
                  </div>
                )}

                {/* 2. Traditional Chinese 和合本繁體 */}
                {(displayMode === 'trilingual' || displayMode === 'zh') && (
                  <div className={displayMode === 'trilingual' ? 'pt-6 border-t border-stone-200/30 dark:border-stone-800/60' : ''}>
                    <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-amber-500/90 dark:text-amber-400/90 mb-2">
                      <span>和合本（繁體中文）</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100 font-serif-chinese">
                        {activeVerse.reference.zh}
                      </span>
                    </div>

                    <blockquote
                      className="font-serif-chinese leading-relaxed text-stone-900 dark:text-stone-100 select-text"
                      style={{ fontSize: `${1.7 * fontSizeMultiplier}rem` }}
                    >
                      「{activeVerse.text.zh}」
                    </blockquote>
                  </div>
                )}

                {/* 3. French (Louis Segond) */}
                {(displayMode === 'trilingual' || displayMode === 'fr') && (
                  <div className={displayMode === 'trilingual' ? 'pt-6 border-t border-stone-200/30 dark:border-stone-800/60' : ''}>
                    <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-amber-500/90 dark:text-amber-400/90 mb-2">
                      <span>Français (Louis Segond)</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">
                        {activeVerse.reference.fr}
                      </span>
                    </div>

                    <blockquote
                      className="font-serif-verse italic leading-relaxed text-stone-800 dark:text-stone-200 select-text"
                      style={{ fontSize: `${1.8 * fontSizeMultiplier}rem` }}
                    >
                      « {activeVerse.text.fr} »
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Card Footer: Audio, Bookmark, Share, Official Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/40 pt-5 dark:border-stone-800/80">
                <div className="flex items-center gap-2">
                  {/* Listen Recitation Aloud */}
                  <div className="flex items-center rounded-xl border border-stone-200 bg-stone-100/70 p-1 dark:border-stone-800 dark:bg-stone-900/60 text-xs">
                    <button
                      onClick={() => handleSpeak(displayMode === 'zh' ? 'zh' : displayMode === 'fr' ? 'fr' : 'en')}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                        isSpeaking
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white'
                      }`}
                      title="Listen to verse recitation"
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-amber-500" />}
                      <span>{isSpeaking ? 'Stop Recitation' : 'Listen Aloud'}</span>
                    </button>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleFavorite(activeVerse.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      isFavorite
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                        : 'border-stone-200 bg-white/60 text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-400'
                    }`}
                  >
                    {isFavorite ? <BookmarkCheck className="h-4 w-4 text-amber-500" /> : <Bookmark className="h-4 w-4" />}
                    <span>{isFavorite ? 'Saved' : 'Save'}</span>
                  </button>

                  {/* Share Card */}
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white/60 px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-400"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share Card</span>
                  </button>
                </div>

                {/* Direct Source Link */}
                <a
                  href={activeVerse.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-500 transition"
                >
                  <span>Bible Source Citation</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* ACTION PANELS: SCRAMBLE & CONTEMPLATE */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 1. Scramble Verse Selector */}
              <div className={`rounded-2xl border p-5 transition-all ${themeClasses.cardSub}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      <Shuffle className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        Scramble Inspirational Verse
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Roll a fresh verse from Psalms, Proverbs, or John
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Seeking divine encouragement right now? Scramble through our trilingual collection of promises, wisdom, and comfort.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleScramble('all')}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-stone-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 active:scale-95"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                    <span>Scramble Any Book</span>
                  </button>
                </div>
              </div>

              {/* 2. Interactive Contemplation & Unscramble Game */}
              <div className={`rounded-2xl border p-5 transition-all ${themeClasses.cardSub}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        Unscramble & Meditate
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Contemplative Scripture puzzle in 3 languages
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Deepen your memory and focus by reconstructing the scrambled words of this verse in English, 繁體中文, or Français.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => setShowUnscrambleModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-semibold text-amber-700 hover:bg-amber-500/20 dark:text-amber-300 transition active:scale-95"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Start Contemplation Puzzle</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Official Scripture Sources Info Banner */}
            <div className="rounded-2xl border border-stone-200/60 bg-white/40 p-4 text-xs text-stone-500 dark:border-stone-800/80 dark:bg-stone-900/30 dark:text-stone-400">
              <div className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                <span>Scripture Translations & Online Sources</span>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <a
                  href={SOURCE_LINKS.proverbs}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-stone-200 p-2 hover:border-amber-500 dark:border-stone-800 transition block"
                >
                  <strong className="text-stone-800 dark:text-stone-200">Proverbs (NKJV)</strong>
                  <p className="text-stone-400 truncate">BibleGateway: Proverbs 1-31</p>
                </a>
                <a
                  href={SOURCE_LINKS.psalms}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-stone-200 p-2 hover:border-amber-500 dark:border-stone-800 transition block"
                >
                  <strong className="text-stone-800 dark:text-stone-200">Psalms (NKJV)</strong>
                  <p className="text-stone-400 truncate">BibleStudyTools: Psalms</p>
                </a>
                <a
                  href={SOURCE_LINKS.john}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-stone-200 p-2 hover:border-amber-500 dark:border-stone-800 transition block"
                >
                  <strong className="text-stone-800 dark:text-stone-200">Gospel of John (NKJV)</strong>
                  <p className="text-stone-400 truncate">BibleStudyTools: John</p>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WIDGET STUDIO */}
        {activeTab === 'widget-studio' && (
          <WidgetStudio
            currentVerse={activeVerse}
            language={displayMode === 'zh' ? 'zh' : displayMode === 'fr' ? 'fr' : 'en'}
          />
        )}

        {/* TAB 3: FAVORITES LIST */}
        {activeTab === 'favorites' && (
          <div className="rounded-3xl border border-stone-200 bg-white/70 p-6 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/60 sm:p-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Bookmark className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                    Saved Verses & Meditations ({favorites.length})
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Your personal sanctuary of bookmarked scriptures
                  </p>
                </div>
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-400">
                <Bookmark className="mx-auto h-8 w-8 opacity-30 mb-2" />
                No saved verses yet. Click the bookmark icon on any quote to save it here.
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {favorites.map(favId => {
                  const verse = VERSES_DATABASE.find(v => v.id === favId);
                  if (!verse) return null;

                  return (
                    <div
                      key={verse.id}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-stone-100 bg-stone-50/70 p-4 transition hover:border-amber-400/50 hover:bg-white dark:border-stone-800 dark:bg-stone-800/40 dark:hover:bg-stone-800"
                    >
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          setActiveVerse(verse);
                          setIsCustomScrambled(true);
                          setActiveTab('sanctuary');
                        }}
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                          <span className="text-amber-500 font-bold">{verse.reference.en}</span>
                          <span className="text-stone-400">• {verse.reference.zh}</span>
                          <span className="text-[10px] rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-600 dark:text-amber-400">
                            {verse.bookName.en}
                          </span>
                        </div>

                        <p className="mt-1 text-xs italic font-serif-verse line-clamp-2 text-stone-700 dark:text-stone-300">
                          "{verse.text.en}"
                        </p>
                        <p className="mt-1 text-xs font-serif-chinese line-clamp-1 text-stone-500 dark:text-stone-400">
                          「{verse.text.zh}」
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleFavorite(verse.id)}
                        className="p-2 text-stone-400 hover:text-rose-500 transition"
                        title="Remove from saved"
                      >
                        <BookmarkCheck className="h-4 w-4 text-amber-500 hover:text-rose-500" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Offline Indicator */}
      <OfflineIndicator />

      {/* MODALS */}
      <NotificationSettingsModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        permission={permission}
        settings={settings}
        setSettings={setSettings}
        requestPermission={requestPermission}
        sendTestNotification={sendTestNotification}
        currentVerse={activeVerse}
      />

      <VerseUnscrambleModal
        verse={activeVerse}
        language={displayMode === 'zh' ? 'zh' : displayMode === 'fr' ? 'fr' : 'en'}
        isOpen={showUnscrambleModal}
        onClose={() => setShowUnscrambleModal(false)}
      />

      <TimelineDrawer
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        verses={VERSES_DATABASE}
        currentHour={currentDate.getHours()}
        selectedHour={activeVerse.defaultHour}
        onSelectHour={(hour) => {
          const matched = VERSES_DATABASE.find(v => v.defaultHour === hour) || VERSES_DATABASE[hour % VERSES_DATABASE.length];
          setActiveVerse(matched);
          setIsCustomScrambled(hour !== currentDate.getHours());
        }}
        language={displayMode === 'zh' ? 'zh' : displayMode === 'fr' ? 'fr' : 'en'}
      />

      <ShareCardModal
        verse={activeVerse}
        language={displayMode === 'zh' ? 'zh' : displayMode === 'fr' ? 'fr' : 'en'}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-stone-200/20 py-4 text-center text-xs text-stone-500 dark:border-stone-800">
        <p>
          Hourly quote of the day from Psalms and Proverbs • Gospel of John • NKJV
        </p>
      </footer>
    </div>
  );
}
