import React, { useState } from 'react';
import { Verse, Language } from '../types/verse';
import { X, Download, Share2, Copy, Check, Sparkles } from 'lucide-react';

interface ShareCardModalProps {
  verse: Verse;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  verse,
  language,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'trilingual' | 'single'>('trilingual');
  const [cardTheme, setCardTheme] = useState<'midnight' | 'gold' | 'linen'>('midnight');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const getShareText = () => {
    if (format === 'single') {
      const text = language === 'zh' ? verse.text.zh : language === 'fr' ? verse.text.fr : verse.text.en;
      const ref = language === 'zh' ? verse.reference.zh : language === 'fr' ? verse.reference.fr : verse.reference.en;
      return `"${text}"\n— ${ref} (${verse.bookName.en.toUpperCase()})\n\nSource: ${verse.sourceUrl}`;
    }

    return `📖 Hourly Word of the Day:\n\n[English - NKJV]\n"${verse.text.en}"\n— ${verse.reference.en}\n\n[繁體中文 - 和合本]\n「${verse.text.zh}」\n— ${verse.reference.zh}\n\n[Français - LSG]\n« ${verse.text.fr} »\n— ${verse.reference.fr}\n\nSource: ${verse.sourceUrl}`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hourly Quote: ${verse.reference.en}`,
          text: getShareText(),
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyText();
    }
  };

  const handleDownloadCardImage = () => {
    setIsGenerating(true);
    const canvas = document.createElement('canvas');
    const scale = 2;
    const width = 800;
    const height = 1000;

    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    ctx.scale(scale, scale);

    // Background themes
    if (cardTheme === 'midnight') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0c0a09');
      grad.addColorStop(1, '#1c1917');
      ctx.fillStyle = grad;
    } else if (cardTheme === 'gold') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1c1917');
      grad.addColorStop(1, '#292524');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = '#faf7f2';
    }

    ctx.fillRect(0, 0, width, height);

    // Border frame
    ctx.strokeStyle = cardTheme === 'linen' ? '#d6cebd' : '#ca8a0440';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Header badge
    ctx.fillStyle = cardTheme === 'linen' ? '#92400e' : '#f59e0b';
    ctx.font = '700 14px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('HOURLY QUOTE OF THE DAY • PSALMS & PROVERBS', width / 2, 90);

    // Subtitle
    ctx.fillStyle = cardTheme === 'linen' ? '#78716c' : '#a8a29e';
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`HOUR ${String(new Date().getHours()).padStart(2, '0')}:00 • ${verse.themeLabel.en.toUpperCase()}`, width / 2, 115);

    // English Text
    ctx.fillStyle = cardTheme === 'linen' ? '#1c1917' : '#f5f5f4';
    ctx.font = 'italic 500 24px "Cormorant Garamond", Georgia, serif';

    const renderWrapped = (text: string, startY: number, maxW: number, lineH: number, isZh = false) => {
      const words = isZh ? text.split('') : text.split(' ');
      let line = '';
      let y = startY;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + (isZh ? words[i] : (line ? ' ' : '') + words[i]);
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && i > 0) {
          ctx.fillText(line, width / 2, y);
          line = words[i];
          y += lineH;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, width / 2, y);
      return y;
    };

    let curY = renderWrapped(`"${verse.text.en}"`, 220, 640, 36);

    ctx.fillStyle = cardTheme === 'linen' ? '#b45309' : '#fbbf24';
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`— ${verse.reference.en}`, width / 2, curY + 36);

    // Chinese Text
    curY += 90;
    ctx.fillStyle = cardTheme === 'linen' ? '#292524' : '#e7e5e4';
    ctx.font = '500 20px "Noto Serif TC", serif';
    curY = renderWrapped(`「${verse.text.zh}」`, curY, 620, 32, true);

    ctx.fillStyle = cardTheme === 'linen' ? '#b45309' : '#fbbf24';
    ctx.font = '600 14px "Noto Serif TC", serif';
    ctx.fillText(`— ${verse.reference.zh}`, width / 2, curY + 32);

    // French Text
    curY += 80;
    ctx.fillStyle = cardTheme === 'linen' ? '#57534e' : '#d6d3d1';
    ctx.font = 'italic 400 18px "Cormorant Garamond", Georgia, serif';
    curY = renderWrapped(`« ${verse.text.fr} »`, curY, 620, 28);

    ctx.fillStyle = cardTheme === 'linen' ? '#b45309' : '#fbbf24';
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`— ${verse.reference.fr}`, width / 2, curY + 28);

    // Footer
    ctx.fillStyle = cardTheme === 'linen' ? '#a8a29e' : '#78716c';
    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Proverbs • Psalms • Gospel of John | NKJV`, width / 2, height - 60);

    setTimeout(() => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `quote-card-${verse.id}.png`;
      a.click();
      setIsGenerating(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 sm:p-7">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Share2 className="h-4 w-4" />
            </span>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Share Inspirational Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview Card */}
        <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-900 p-5 text-stone-100 shadow-inner dark:border-stone-700">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            {verse.reference.en} • {verse.bookName.en}
          </div>
          <p className="mt-2 text-sm italic font-serif-verse leading-relaxed text-stone-200">
            "{verse.text.en}"
          </p>
          <p className="mt-2 text-xs font-serif-chinese leading-relaxed text-amber-200/90">
            「{verse.text.zh}」
          </p>
          <p className="mt-2 text-xs italic font-serif-verse leading-relaxed text-stone-300">
            « {verse.text.fr} »
          </p>
        </div>

        {/* Options */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Format
            </label>
            <div className="mt-1 flex gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
              <button
                onClick={() => setFormat('trilingual')}
                className={`flex-1 rounded-lg py-1 font-medium transition ${
                  format === 'trilingual' ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100' : 'text-stone-500'
                }`}
              >
                Trilingual
              </button>
              <button
                onClick={() => setFormat('single')}
                className={`flex-1 rounded-lg py-1 font-medium transition ${
                  format === 'single' ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100' : 'text-stone-500'
                }`}
              >
                Selected Lang
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Card Palette
            </label>
            <div className="mt-1 flex gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
              <button
                onClick={() => setCardTheme('midnight')}
                className={`flex-1 rounded-lg py-1 font-medium transition ${
                  cardTheme === 'midnight' ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100' : 'text-stone-500'
                }`}
              >
                Midnight
              </button>
              <button
                onClick={() => setCardTheme('linen')}
                className={`flex-1 rounded-lg py-1 font-medium transition ${
                  cardTheme === 'linen' ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100' : 'text-stone-500'
                }`}
              >
                Linen
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-4 dark:border-stone-800">
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Formatted Quote!' : 'Copy Text'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCardImage}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-stone-800 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              <Download className="h-3.5 w-3.5" />
              {isGenerating ? 'Rendering...' : 'Download Card PNG'}
            </button>

            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-stone-950 shadow-sm hover:bg-amber-400"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
