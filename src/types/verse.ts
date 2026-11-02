export type BookSource = 'psalms' | 'proverbs' | 'john';

export type Language = 'en' | 'zh' | 'fr';

export type Category = 
  | 'wisdom' 
  | 'peace' 
  | 'faith' 
  | 'love' 
  | 'guidance' 
  | 'comfort' 
  | 'light' 
  | 'strength' 
  | 'hope' 
  | 'truth';

export interface Verse {
  id: string;
  book: BookSource;
  bookName: {
    en: string;
    zh: string;
    fr: string;
  };
  chapter: number;
  verse: string;
  reference: {
    en: string;
    zh: string;
    fr: string;
  };
  text: {
    en: string; // NKJV
    zh: string; // Traditional Chinese CUV 和合本繁體
    fr: string; // Louis Segond / Français Courant
  };
  sourceUrl: string;
  category: Category;
  themeLabel: {
    en: string;
    zh: string;
    fr: string;
  };
  defaultHour: number; // 0-23
}

export type ThemeStyle = 'monochrome' | 'parchment' | 'midnight' | 'sage' | 'indigo';

export type WidgetSize = 'ios-small' | 'ios-medium' | 'ios-large' | 'ios-lockscreen' | 'android-pill' | 'android-card';
