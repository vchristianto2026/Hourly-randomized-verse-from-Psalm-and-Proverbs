import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, X, PlusSquare } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone app, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-500/25 transition active:scale-95 dark:text-amber-300"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition active:scale-95 dark:border-stone-700 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          <PlusSquare className="w-3.5 h-3.5 text-amber-500" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <h3 className="text-base font-semibold text-stone-900 dark:text-white flex items-center gap-2">
                  <span>📱</span> Install on iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    1
                  </div>
                  <div>
                    Tap the <strong>Share</strong> icon{' '}
                    <Share className="inline h-3.5 w-3.5 text-sky-500" /> in Safari’s navigation bar.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    2
                  </div>
                  <div>
                    Scroll down and select <strong>"Add to Home Screen"</strong> with the plus badge.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    3
                  </div>
                  <div>
                    Tap <strong>Add</strong> in the top right corner. The widget and app will appear on your iOS home screen!
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic fallback install guide button for desktop/other browsers
  return (
    <button
      onClick={() => setShowIOSGuide(true)}
      className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition active:scale-95 dark:border-stone-800 dark:bg-stone-900/70 dark:text-stone-300"
    >
      <Download className="w-3.5 h-3.5 text-amber-500" />
      <span>Install App</span>
    </button>
  );
};
