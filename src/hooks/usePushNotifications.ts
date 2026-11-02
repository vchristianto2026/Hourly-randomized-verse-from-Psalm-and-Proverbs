import { useState, useEffect, useCallback, useRef } from 'react';
import { Language, Verse } from '../types/verse';

export interface NotificationSettings {
  enabled: boolean;
  soundEnabled: boolean;
  quietHoursEnabled: boolean;
  quietStart: number; // e.g. 22 (10 PM)
  quietEnd: number;   // e.g. 7 (7 AM)
  language: Language | 'trilingual';
}

const STORAGE_KEY = 'hourly_verse_notification_settings_v1';

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  soundEnabled: true,
  quietHoursEnabled: false,
  quietStart: 22,
  quietEnd: 7,
  language: 'en',
};

/**
 * Peaceful soft gentle chime synthesized with Web Audio API.
 * No external mp3 required; works offline instantly.
 */
function playSereneChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonious chord notes (E4, B4, E5)
    const freqs = [329.63, 493.88, 659.25];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.001, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 2.0);
    });
  } catch (err) {
    console.warn('Audio chime skipped:', err);
  }
}

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  const checkTimerRef = useRef<number | null>(null);
  const lastHourNotifiedRef = useRef<number | null>(null);

  // Initialize permission state
  useEffect(() => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
    } else {
      setPermission(Notification.permission);
    }
  }, []);

  // Save settings changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Request permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        setSettings(prev => ({ ...prev, enabled: true }));
        return true;
      } else {
        setSettings(prev => ({ ...prev, enabled: false }));
        return false;
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      return false;
    }
  }, []);

  // Dispatch a local notification
  const dispatchNotification = useCallback((verse: Verse, customTitle?: string) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return false;
    }

    // Determine content text based on language setting
    let bodyText = '';
    let refText = '';

    if (settings.language === 'zh') {
      bodyText = verse.text.zh;
      refText = verse.reference.zh;
    } else if (settings.language === 'fr') {
      bodyText = verse.text.fr;
      refText = verse.reference.fr;
    } else if (settings.language === 'trilingual') {
      bodyText = `${verse.text.en}\n\n${verse.text.zh}\n\n${verse.text.fr}`;
      refText = `${verse.reference.en} | ${verse.reference.zh} | ${verse.reference.fr}`;
    } else {
      bodyText = verse.text.en;
      refText = verse.reference.en;
    }

    const title = customTitle || `🕊️ Hourly Word • ${refText}`;

    try {
      new Notification(title, {
        body: bodyText,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: `hourly-verse-${verse.id}-${Date.now()}`,
        requireInteraction: false,
      });

      if (settings.soundEnabled) {
        playSereneChime();
      }

      return true;
    } catch (err) {
      console.error('Failed to trigger notification:', err);
      return false;
    }
  }, [settings.language, settings.soundEnabled]);

  // Send a test notification
  const sendTestNotification = useCallback((verse: Verse) => {
    return dispatchNotification(verse, `🕊️ Hourly Word Test Notification`);
  }, [dispatchNotification]);

  // Hourly background scheduler in active session
  const checkHourlyTick = useCallback((getCurrentVerse: () => Verse) => {
    if (!settings.enabled || permission !== 'granted') return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Check quiet hours
    if (settings.quietHoursEnabled) {
      if (settings.quietStart > settings.quietEnd) {
        // e.g. 22:00 to 07:00
        if (currentHour >= settings.quietStart || currentHour < settings.quietEnd) {
          return;
        }
      } else {
        if (currentHour >= settings.quietStart && currentHour < settings.quietEnd) {
          return;
        }
      }
    }

    // Fire near top of the hour (minutes === 0) and once per hour
    if (currentMinutes === 0 && lastHourNotifiedRef.current !== currentHour) {
      lastHourNotifiedRef.current = currentHour;
      const verse = getCurrentVerse();
      dispatchNotification(verse);
    }
  }, [settings.enabled, settings.quietHoursEnabled, settings.quietStart, settings.quietEnd, permission, dispatchNotification]);

  return {
    permission,
    settings,
    setSettings,
    requestPermission,
    sendTestNotification,
    checkHourlyTick,
    playSereneChime,
  };
}
