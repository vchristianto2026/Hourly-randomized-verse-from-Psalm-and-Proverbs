import { BookSource, Language, Verse } from '../types/verse';

/**
 * Calculates a deterministic verse for the given date & hour.
 * Ensures that for any hour (0-23) on any date, all users around the globe
 * or on the same day share a harmonious hourly verse, or maps to defaultHour.
 */
export function getHourlyVerse(date: Date, verses: Verse[]): Verse {
  if (!verses || verses.length === 0) {
    throw new Error('No verses available in database.');
  }

  const hour = date.getHours();
  // First attempt: matching defaultHour
  const matched = verses.find(v => v.defaultHour === hour);
  if (matched) {
    return matched;
  }

  // Fallback: deterministic day + hour hash
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const index = Math.abs((dayOfYear * 24 + hour) % verses.length);
  return verses[index];
}

/**
 * Calculates minutes and seconds remaining until the next top of the hour.
 */
export function getCountdownToNextHour(now: Date): {
  minutes: number;
  seconds: number;
  progressPercent: number; // 0 to 100% of current hour completed
  formatted: string;
} {
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  const secondsIntoHour = currentMinutes * 60 + currentSeconds;
  const secondsRemaining = 3600 - secondsIntoHour;

  const minutesLeft = Math.floor(secondsRemaining / 60);
  const secondsLeft = secondsRemaining % 60;
  const progressPercent = Math.min(100, Math.max(0, (secondsIntoHour / 3600) * 100));

  const pad = (n: number) => n.toString().padStart(2, '0');

  return {
    minutes: minutesLeft,
    seconds: secondsLeft,
    progressPercent,
    formatted: `${pad(minutesLeft)}m ${pad(secondsLeft)}s`,
  };
}

/**
 * Randomly scrambles and selects an inspirational verse from Psalms, Proverbs, or John.
 */
export function scrambleVerse(
  verses: Verse[],
  currentId?: string,
  bookFilter: BookSource | 'all' = 'all'
): Verse {
  const filtered = bookFilter === 'all' 
    ? verses 
    : verses.filter(v => v.book === bookFilter);

  const pool = filtered.filter(v => v.id !== currentId);
  const finalPool = pool.length > 0 ? pool : filtered;

  if (finalPool.length === 0) return verses[0];
  const randomIndex = Math.floor(Math.random() * finalPool.length);
  return finalPool[randomIndex];
}

/**
 * Splits verse text into scrambled tokens for the interactive contemplation puzzle.
 */
export function createScrambleTokens(text: string, lang: Language): { id: string; text: string; correctIndex: number }[] {
  let tokens: string[] = [];

  if (lang === 'zh') {
    // Break Chinese text into short poetic segments (2-4 chars or by punctuation)
    const segments = text.replace(/([，。；！？」])/g, '$1|').split('|').filter(Boolean);
    tokens = segments.flatMap(seg => {
      if (seg.length > 5) {
        const mid = Math.ceil(seg.length / 2);
        return [seg.slice(0, mid), seg.slice(mid)];
      }
      return [seg];
    });
  } else {
    // English & French: split by space or short word groupings
    const words = text.split(/\s+/).filter(Boolean);
    // Group small words with their following word if needed, or words directly
    tokens = words;
  }

  const tokenObjects = tokens.map((t, idx) => ({
    id: `token-${idx}-${Math.random().toString(36).substring(2, 7)}`,
    text: t,
    correctIndex: idx
  }));

  // Shuffle array using Fisher-Yates
  const shuffled = [...tokenObjects];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Speech synthesis with graceful voice selection for English, French, and Chinese.
 */
export function speakVerseText(text: string, lang: Language): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported in this browser.'));
      return;
    }

    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set appropriate language code
    if (lang === 'zh') {
      utterance.lang = 'zh-HK'; // Traditional Chinese / Cantonese or zh-TW
    } else if (lang === 'fr') {
      utterance.lang = 'fr-FR';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.9; // Calm, meditative pace
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => {
      if (lang === 'zh') return v.lang.startsWith('zh') || v.lang.includes('TW') || v.lang.includes('HK');
      if (lang === 'fr') return v.lang.startsWith('fr');
      return v.lang.startsWith('en');
    });

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve(); // Graceful finish

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
