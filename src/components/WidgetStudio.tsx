import React, { useState, useRef } from 'react';
import { Verse, Language } from '../types/verse';
import { Smartphone, Download, Copy, Check, Sparkles, Layers, Sliders, ExternalLink, HelpCircle } from 'lucide-react';

interface WidgetStudioProps {
  currentVerse: Verse;
  language: Language;
}

type WidgetType = 'ios-small' | 'ios-medium' | 'ios-large' | 'ios-lockscreen' | 'android-pill' | 'android-card';
type WidgetTheme = 'dark-gold' | 'parchment' | 'pure-black' | 'sage' | 'ocean';

const THEMES: Record<WidgetTheme, {
  name: string;
  bgClass: string;
  cardBg: string;
  textColor: string;
  subColor: string;
  accentColor: string;
  border: string;
  canvasBg: string;
  canvasText: string;
  canvasAccent: string;
}> = {
  'dark-gold': {
    name: 'Obsidian & Gold',
    bgClass: 'bg-stone-950',
    cardBg: 'bg-gradient-to-br from-stone-900 to-stone-950',
    textColor: 'text-stone-100',
    subColor: 'text-amber-300/80',
    accentColor: 'text-amber-400',
    border: 'border-amber-500/20 shadow-amber-500/5',
    canvasBg: '#0c0a09',
    canvasText: '#f5f5f4',
    canvasAccent: '#fbbf24',
  },
  'parchment': {
    name: 'Warm Parchment',
    bgClass: 'bg-amber-50',
    cardBg: 'bg-gradient-to-br from-[#fbf8f2] to-[#f4eee1]',
    textColor: 'text-stone-900',
    subColor: 'text-stone-600',
    accentColor: 'text-amber-800',
    border: 'border-amber-900/15 shadow-stone-300/40',
    canvasBg: '#fbf8f2',
    canvasText: '#1c1917',
    canvasAccent: '#92400e',
  },
  'pure-black': {
    name: 'Monochrome Minimal',
    bgClass: 'bg-black',
    cardBg: 'bg-zinc-950',
    textColor: 'text-zinc-100',
    subColor: 'text-zinc-400',
    accentColor: 'text-white',
    border: 'border-zinc-800 shadow-black',
    canvasBg: '#09090b',
    canvasText: '#fafafa',
    canvasAccent: '#ffffff',
  },
  'sage': {
    name: 'Quiet Sage',
    bgClass: 'bg-[#1b2621]',
    cardBg: 'bg-gradient-to-br from-[#1b2621] to-[#121c17]',
    textColor: 'text-emerald-50',
    subColor: 'text-emerald-300/70',
    accentColor: 'text-emerald-300',
    border: 'border-emerald-500/20 shadow-emerald-950/40',
    canvasBg: '#131e19',
    canvasText: '#ecfdf5',
    canvasAccent: '#6ee7b7',
  },
  'ocean': {
    name: 'Midnight Ocean',
    bgClass: 'bg-slate-950',
    cardBg: 'bg-gradient-to-br from-slate-900 to-slate-950',
    textColor: 'text-slate-100',
    subColor: 'text-cyan-300/80',
    accentColor: 'text-sky-400',
    border: 'border-cyan-500/20 shadow-sky-950/40',
    canvasBg: '#020617',
    canvasText: '#f8fafc',
    canvasAccent: '#38bdf8',
  },
};

export const WidgetStudio: React.FC<WidgetStudioProps> = ({ currentVerse, language }) => {
  const [selectedType, setSelectedType] = useState<WidgetType>('ios-medium');
  const [selectedTheme, setSelectedTheme] = useState<WidgetTheme>('dark-gold');
  const [widgetLang, setWidgetLang] = useState<Language | 'bilingual'>(language);
  const [copiedScript, setCopiedScript] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const themeConfig = THEMES[selectedTheme];

  const getVerseText = () => {
    if (widgetLang === 'zh') return currentVerse.text.zh;
    if (widgetLang === 'fr') return currentVerse.text.fr;
    return currentVerse.text.en;
  };

  const getReferenceText = () => {
    if (widgetLang === 'zh') return currentVerse.reference.zh;
    if (widgetLang === 'fr') return currentVerse.reference.fr;
    return currentVerse.reference.en;
  };

  // Generate downloadable High-Resolution Image of the Widget for Lockscreen / Wallpaper / PhotoWidget
  const handleDownloadWidgetImage = () => {
    setIsDownloading(true);
    const canvas = document.createElement('canvas');
    const scale = 2; // Retina sharpness

    let width = 640;
    let height = 320;

    if (selectedType === 'ios-small') {
      width = 360;
      height = 360;
    } else if (selectedType === 'ios-large') {
      width = 640;
      height = 640;
    } else if (selectedType === 'ios-lockscreen') {
      width = 600;
      height = 200;
    } else if (selectedType === 'android-pill') {
      width = 600;
      height = 240;
    }

    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    ctx.scale(scale, scale);

    // Background
    ctx.fillStyle = themeConfig.canvasBg;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, selectedType === 'android-pill' ? 36 : 28);
    ctx.fill();

    // Subtle Border
    ctx.strokeStyle = themeConfig.canvasAccent + '33';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Subtle header tag
    ctx.fillStyle = themeConfig.canvasAccent;
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    const hourString = `${String(new Date().getHours()).padStart(2, '0')}:00 HOURLY WORD`;
    ctx.fillText(hourString, 28, 42);

    // Verse reference badge
    ctx.textAlign = 'right';
    ctx.font = '700 14px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(getReferenceText(), width - 28, 42);

    // Scripture Text formatting
    ctx.textAlign = 'left';
    ctx.fillStyle = themeConfig.canvasText;

    const mainText = getVerseText();
    const isChinese = widgetLang === 'zh';
    const fontSize = selectedType === 'ios-small' ? 15 : selectedType === 'ios-large' ? 22 : 18;
    ctx.font = `italic 500 ${fontSize}px ${isChinese ? '"Noto Serif TC", serif' : '"Cormorant Garamond", Georgia, serif'}`;

    // Simple text wrapper
    const maxWidth = width - 56;
    const words = isChinese ? mainText.split('') : mainText.split(' ');
    let line = '';
    let y = 85;
    const lineHeight = fontSize * 1.5;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (isChinese ? words[i] : (line ? ' ' : '') + words[i]);
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 28, y);
        line = words[i];
        y += lineHeight;
        if (y > height - 45) {
          line += '...';
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 28, y);

    // Bottom Footer
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = themeConfig.canvasAccent + 'aa';
    ctx.fillText(currentVerse.bookName.en.toUpperCase() + ' • PEACE & WISDOM', 28, height - 24);

    // Trigger download
    setTimeout(() => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `hourly-quote-${currentVerse.id}-${selectedType}.png`;
      a.click();
      setIsDownloading(false);
    }, 200);
  };

  // Generate Scriptable iOS Widget Code
  const handleCopyScriptableCode = () => {
    const scriptCode = `// Scriptable iOS Widget for "Hourly quote of the day from Psalms and Proverbs"
// Instructions: Copy this into Scriptable app on iOS and add as a Home Screen Widget.

const url = "https://bible-gateway-quote.applet";
const verse = {
  ref: "${currentVerse.reference.en}",
  refZh: "${currentVerse.reference.zh}",
  refFr: "${currentVerse.reference.fr}",
  textEn: "${currentVerse.text.en.replace(/"/g, '\\"')}",
  textZh: "${currentVerse.text.zh}",
  textFr: "${currentVerse.text.fr.replace(/"/g, '\\"')}",
  book: "${currentVerse.bookName.en}"
};

let widget = new ListWidget();
widget.backgroundColor = new Color("#0c0a09");

// Header
let headerStack = widget.addStack();
let hourBadge = headerStack.addText("🕊️ " + new Date().getHours() + ":00 WORD");
hourBadge.font = Font.boldSystemFont(11);
hourBadge.textColor = new Color("#eab308");
headerStack.addSpacer();

let refText = headerStack.addText(verse.ref);
refText.font = Font.semiboldSystemFont(11);
refText.textColor = new Color("#d6d3d1");

widget.addSpacer(8);

// Verse
let body = widget.addText('"' + verse.textEn + '"');
body.font = Font.italicSystemFont(14);
body.textColor = new Color("#fafaf9");

widget.addSpacer(6);

// Multilingual note
let zhText = widget.addText(verse.textZh);
zhText.font = Font.systemFont(12);
zhText.textColor = new Color("#ca8a04");

Script.setWidget(widget);
Script.complete();
widget.presentMedium();`;

    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all dark:border-stone-800/80 dark:bg-stone-900/60">
      {/* Studio Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 pb-5 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Smartphone className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Mobile Widget Studio
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              iOS & Android
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Preview, customize, and export interactive widgets for your smartphone home & lock screens.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
          <button
            onClick={handleDownloadWidgetImage}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-stone-800 active:scale-95 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            <Download className="h-3.5 w-3.5" />
            {isDownloading ? 'Generating...' : 'Save Widget PNG'}
          </button>

          <button
            onClick={handleCopyScriptableCode}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            title="Copy iOS Scriptable Script for live hourly updating native widget"
          >
            {copiedScript ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedScript ? 'Script Copied!' : 'iOS Scriptable Code'}
          </button>
        </div>
      </div>

      {/* Control Tabs: Size / System */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column: Customization Controls */}
        <div className="space-y-4 lg:col-span-5">
          {/* Widget Form Factor Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Widget Size & Style
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedType('ios-medium')}
                className={`flex items-center justify-between rounded-xl border p-2.5 font-medium transition ${
                  selectedType === 'ios-medium'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>iOS Medium (4x2)</span>
                <span className="text-[10px] opacity-70">Popular</span>
              </button>

              <button
                onClick={() => setSelectedType('ios-small')}
                className={`flex items-center justify-between rounded-xl border p-2.5 font-medium transition ${
                  selectedType === 'ios-small'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>iOS Small (2x2)</span>
                <span className="text-[10px] opacity-70">Square</span>
              </button>

              <button
                onClick={() => setSelectedType('ios-large')}
                className={`flex items-center justify-between rounded-xl border p-2.5 font-medium transition ${
                  selectedType === 'ios-large'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>iOS Large (4x4)</span>
                <span className="text-[10px] opacity-70">Trilingual</span>
              </button>

              <button
                onClick={() => setSelectedType('android-card')}
                className={`flex items-center justify-between rounded-xl border p-2.5 font-medium transition ${
                  selectedType === 'android-card'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>Android Material You</span>
                <span className="text-[10px] opacity-70">Dynamic</span>
              </button>

              <button
                onClick={() => setSelectedType('android-pill')}
                className={`flex items-center justify-between rounded-xl border p-2.5 font-medium transition ${
                  selectedType === 'android-pill'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>Android Bar (At a Glance)</span>
                <span className="text-[10px] opacity-70">Compact</span>
              </button>

              <button
                onClick={() => setSelectedType('ios-lockscreen')}
                className={`flex items-center justify-between rounded-xl border p-2.5 font-medium transition ${
                  selectedType === 'ios-lockscreen'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>iOS Lock Screen</span>
                <span className="text-[10px] opacity-70">Accessory</span>
              </button>
            </div>
          </div>

          {/* Theme Palette */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Widget Palette
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(Object.keys(THEMES) as WidgetTheme[]).map(themeKey => (
                <button
                  key={themeKey}
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                    selectedTheme === themeKey
                      ? 'border-amber-500 bg-stone-900 text-amber-300 dark:bg-stone-100 dark:text-stone-900'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400'
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-stone-400/40"
                    style={{ backgroundColor: THEMES[themeKey].canvasAccent }}
                  />
                  <span>{THEMES[themeKey].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector for Widget */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Display Language
            </label>
            <div className="mt-2 flex gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'zh', label: '繁體中文' },
                { id: 'fr', label: 'Français' },
                { id: 'bilingual', label: 'Bilingual (雙語)' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setWidgetLang(item.id as Language | 'bilingual')}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                    widgetLang === item.id
                      ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Setup Instructions Collapsible */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-400">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
              <HelpCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              How to add to iOS & Android:
            </div>
            <ul className="mt-2 space-y-1 pl-4 list-disc text-[11px] leading-relaxed">
              <li>
                <strong>Option 1 (Direct PWA):</strong> Tap <em>Share → Add to Home Screen</em> (Safari/Chrome) for the standalone app.
              </li>
              <li>
                <strong>Option 2 (Live iOS Widget):</strong> Tap <em>"iOS Scriptable Code"</em>, open the free <em>Scriptable</em> app on App Store, paste it, and add the widget!
              </li>
              <li>
                <strong>Option 3 (Photo / Lock Screen Widget):</strong> Tap <em>"Save Widget PNG"</em> and pick it in any standard photo widget or phone lock screen wallpaper.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Live Interactive Widget Render Preview */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/80 bg-stone-100/70 p-6 dark:border-stone-800/80 dark:bg-stone-950/70 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between w-full max-w-md px-1 text-[11px] font-medium text-stone-400">
            <span>LIVE INTERACTIVE PREVIEW</span>
            <span>UPDATES HOURLY • {new Date().getHours()}:00</span>
          </div>

          {/* Widget Presentation Canvas */}
          <div className="w-full max-w-md flex justify-center py-2">
            {/* iOS Medium Widget */}
            {selectedType === 'ios-medium' && (
              <div
                className={`relative w-full rounded-[28px] border p-5 shadow-xl transition-all duration-300 ${themeConfig.cardBg} ${themeConfig.border}`}
                style={{ minHeight: '175px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[11px]">
                      🕊️
                    </span>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-amber-500 dark:text-amber-400">
                      {String(new Date().getHours()).padStart(2, '0')}:00 WORD
                    </span>
                  </div>
                  <span className={`text-xs font-semibold ${themeConfig.accentColor}`}>
                    {getReferenceText()}
                  </span>
                </div>

                <div className="mt-3">
                  <p
                    className={`text-sm leading-relaxed ${themeConfig.textColor} ${
                      widgetLang === 'zh' ? 'font-serif-chinese' : 'font-serif-verse italic text-[15px]'
                    }`}
                  >
                    "{getVerseText()}"
                  </p>
                  {widgetLang === 'bilingual' && (
                    <p className={`mt-2 font-serif-chinese text-xs leading-relaxed opacity-85 ${themeConfig.accentColor}`}>
                      {currentVerse.text.zh}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-500/10 text-[10px]">
                  <span className={`font-medium tracking-wide ${themeConfig.subColor}`}>
                    {currentVerse.bookName.en.toUpperCase()} • {currentVerse.themeLabel.en}
                  </span>
                  <span className="opacity-60 text-stone-400">Psalms & Proverbs</span>
                </div>
              </div>
            )}

            {/* iOS Small Widget */}
            {selectedType === 'ios-small' && (
              <div
                className={`relative h-[165px] w-[165px] rounded-[26px] border p-4 shadow-xl flex flex-col justify-between transition-all duration-300 ${themeConfig.cardBg} ${themeConfig.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {String(new Date().getHours()).padStart(2, '0')}:00
                  </span>
                  <span className="text-xs">🕊️</span>
                </div>

                <div>
                  <p
                    className={`text-xs line-clamp-4 leading-tight ${themeConfig.textColor} ${
                      widgetLang === 'zh' ? 'font-serif-chinese' : 'font-serif-verse italic'
                    }`}
                  >
                    "{getVerseText()}"
                  </p>
                </div>

                <div className="border-t border-stone-500/10 pt-1 text-[10px] font-semibold truncate text-amber-400">
                  {getReferenceText()}
                </div>
              </div>
            )}

            {/* iOS Large Widget */}
            {selectedType === 'ios-large' && (
              <div
                className={`relative w-full rounded-[32px] border p-6 shadow-2xl transition-all duration-300 ${themeConfig.cardBg} ${themeConfig.border}`}
                style={{ minHeight: '340px' }}
              >
                <div className="flex items-center justify-between border-b border-stone-500/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕊️</span>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Hourly Contemplation
                      </h4>
                      <p className="text-[11px] opacity-70 text-stone-300">
                        Psalms • Proverbs • Gospel of John
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-300">
                    {String(new Date().getHours()).padStart(2, '0')}:00
                  </span>
                </div>

                {/* Trilingual Stacking in Large Widget */}
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">
                      English (NKJV) • {currentVerse.reference.en}
                    </span>
                    <p className={`mt-0.5 text-sm font-serif-verse italic ${themeConfig.textColor}`}>
                      "{currentVerse.text.en}"
                    </p>
                  </div>

                  <div className="border-t border-stone-500/10 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">
                      繁體中文 (CUV) • {currentVerse.reference.zh}
                    </span>
                    <p className="mt-0.5 text-xs font-serif-chinese leading-relaxed text-amber-100">
                      「{currentVerse.text.zh}」
                    </p>
                  </div>

                  <div className="border-t border-stone-500/10 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">
                      Français • {currentVerse.reference.fr}
                    </span>
                    <p className="mt-0.5 text-xs italic text-stone-300 font-serif-verse">
                      « {currentVerse.text.fr} »
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Android Material You Card Widget */}
            {selectedType === 'android-card' && (
              <div
                className={`relative w-full rounded-[30px] border p-5 shadow-lg transition-all duration-300 ${themeConfig.cardBg} ${themeConfig.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-300">
                    <span>🕊️ Hourly Word</span>
                    <span>•</span>
                    <span>{String(new Date().getHours()).padStart(2, '0')}:00</span>
                  </div>
                  <span className="text-xs font-semibold text-stone-300">
                    {getReferenceText()}
                  </span>
                </div>

                <div className="mt-4">
                  <p
                    className={`text-sm leading-relaxed ${themeConfig.textColor} ${
                      widgetLang === 'zh' ? 'font-serif-chinese' : 'font-serif-verse italic text-base'
                    }`}
                  >
                    "{getVerseText()}"
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-500/10">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Auto-refreshes every hour</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {currentVerse.themeLabel.en}
                  </span>
                </div>
              </div>
            )}

            {/* Android Pill (At a glance) */}
            {selectedType === 'android-pill' && (
              <div
                className={`flex w-full items-center justify-between rounded-full border px-5 py-3 shadow-md transition-all duration-300 ${themeConfig.cardBg} ${themeConfig.border}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-base">🕊️</span>
                  <div className="truncate">
                    <p className={`text-xs font-medium truncate ${themeConfig.textColor}`}>
                      "{getVerseText()}"
                    </p>
                    <p className="text-[10px] text-amber-400 font-semibold truncate">
                      {getReferenceText()}
                    </p>
                  </div>
                </div>
                <div className="ml-3 shrink-0 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                  {String(new Date().getHours()).padStart(2, '0')}:00
                </div>
              </div>
            )}

            {/* iOS Lock Screen Accessory */}
            {selectedType === 'ios-lockscreen' && (
              <div className="w-full max-w-xs rounded-xl border border-white/20 bg-black/60 p-3.5 backdrop-blur-lg text-white shadow-xl">
                <div className="flex items-center justify-between text-[11px] text-stone-300">
                  <span className="font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span>🕊️</span> {getReferenceText()}
                  </span>
                  <span>{String(new Date().getHours()).padStart(2, '0')}:00</span>
                </div>
                <p className="mt-1 text-xs line-clamp-2 italic font-serif-verse leading-snug text-stone-100">
                  "{getVerseText()}"
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] text-stone-400 dark:text-stone-500">
            Preview is scaled for display. Click <strong>"Save Widget PNG"</strong> for full-resolution retina export.
          </p>
        </div>
      </div>
    </div>
  );
};
