import React, { useState } from 'react';
import { Verse, Language } from '../types/verse';
import { NotificationSettings } from '../hooks/usePushNotifications';
import { Bell, BellRing, BellOff, Volume2, Moon, Globe, Send, X, Check, AlertCircle } from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  permission: NotificationPermission | 'unsupported';
  settings: NotificationSettings;
  setSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  requestPermission: () => Promise<boolean>;
  sendTestNotification: (verse: Verse) => boolean;
  currentVerse: Verse;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  permission,
  settings,
  setSettings,
  requestPermission,
  sendTestNotification,
  currentVerse,
}) => {
  const [testSent, setTestSent] = useState(false);
  const [requesting, setRequesting] = useState(false);

  if (!isOpen) return null;

  const handleToggleEnabled = async () => {
    if (!settings.enabled) {
      if (permission !== 'granted') {
        setRequesting(true);
        const granted = await requestPermission();
        setRequesting(false);
        if (!granted) return;
      }
      setSettings(prev => ({ ...prev, enabled: true }));
    } else {
      setSettings(prev => ({ ...prev, enabled: false }));
    }
  };

  const handleTestNotification = () => {
    if (permission !== 'granted') {
      requestPermission().then(granted => {
        if (granted) {
          const sent = sendTestNotification(currentVerse);
          if (sent) {
            setTestSent(true);
            setTimeout(() => setTestSent(false), 3000);
          }
        }
      });
      return;
    }

    const sent = sendTestNotification(currentVerse);
    if (sent) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Bell className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Hourly Push Notifications
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Receive a fresh inspirational verse at the top of every hour
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

        {/* Permission Banner */}
        <div className="mt-4">
          {permission === 'denied' && (
            <div className="mb-4 flex items-start gap-2.5 rounded-2xl bg-rose-50 p-3.5 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div>
                <p className="font-semibold">Notifications are blocked in your browser.</p>
                <p className="mt-0.5 opacity-90">
                  Please tap the site settings / lock icon in your browser address bar and set Notifications to "Allow".
                </p>
              </div>
            </div>
          )}

          {permission === 'unsupported' && (
            <div className="mb-4 rounded-2xl bg-amber-50 p-3.5 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              Web Notifications API is not supported in this browser context.
            </div>
          )}

          {/* Master Toggle */}
          <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                settings.enabled ? 'bg-amber-500 text-stone-950' : 'bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
              }`}>
                {settings.enabled ? <BellRing className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
              </span>
              <div>
                <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Hourly Verse Delivery
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  {settings.enabled ? 'Active • Alerts at :00 every hour' : 'Disabled'}
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleEnabled}
              disabled={requesting}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.enabled ? 'bg-amber-500' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Detailed Preferences */}
        <div className="mt-4 space-y-3">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-stone-100 p-3 dark:border-stone-800/60">
            <div className="flex items-center gap-2.5">
              <Volume2 className="h-4 w-4 text-stone-400" />
              <div>
                <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                  Peaceful Audio Chime
                </span>
                <p className="text-[11px] text-stone-400">Harmonious ambient tone on notification</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={e => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
              className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
          </div>

          {/* Delivery Language */}
          <div className="rounded-xl border border-stone-100 p-3 dark:border-stone-800/60">
            <div className="flex items-center gap-2.5 mb-2">
              <Globe className="h-4 w-4 text-stone-400" />
              <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                Notification Language
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-[11px]">
              {[
                { id: 'en', label: 'English' },
                { id: 'zh', label: '繁體中文' },
                { id: 'fr', label: 'Français' },
                { id: 'trilingual', label: 'Trilingual' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSettings(prev => ({ ...prev, language: item.id as Language | 'trilingual' }))}
                  className={`rounded-lg py-1.5 text-center font-medium transition ${
                    settings.language === item.id
                      ? 'bg-amber-500/15 text-amber-700 font-semibold dark:text-amber-300'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="rounded-xl border border-stone-100 p-3 dark:border-stone-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Moon className="h-4 w-4 text-stone-400" />
                <div>
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                    Quiet Hours (Do Not Disturb)
                  </span>
                  <p className="text-[11px] text-stone-400">Mutes notifications during sleep</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.quietHoursEnabled}
                onChange={e => setSettings(prev => ({ ...prev, quietHoursEnabled: e.target.checked }))}
                className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
            </div>

            {settings.quietHoursEnabled && (
              <div className="mt-3 flex items-center gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600 dark:border-stone-800 dark:text-stone-300">
                <span>From</span>
                <select
                  value={settings.quietStart}
                  onChange={e => setSettings(prev => ({ ...prev, quietStart: parseInt(e.target.value) }))}
                  className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
                <span>until</span>
                <select
                  value={settings.quietEnd}
                  onChange={e => setSettings(prev => ({ ...prev, quietEnd: parseInt(e.target.value) }))}
                  className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
          <button
            onClick={handleTestNotification}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
          >
            {testSent ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Send className="h-3.5 w-3.5" />}
            {testSent ? 'Sent Test Alert!' : 'Send Test Notification'}
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-stone-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
