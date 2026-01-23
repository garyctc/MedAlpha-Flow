import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { format, parse } from "date-fns";
import { de as deLocale, enUS } from "date-fns/locale";

import de from "./locales/de.json";
import en from "./locales/en.json";

export const SUPPORTED_LOCALES = ["de", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const STORAGE_KEY = "locale";
const DEFAULT_LOCALE: Locale = "en";

function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  if (value === "de" || value === "en") return value;
  return null;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return normalizeLocale(window.localStorage.getItem(STORAGE_KEY)) ?? DEFAULT_LOCALE;
}

export const i18nInitPromise = i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: getInitialLocale(),
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
});

export function setLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }
  void i18n.changeLanguage(locale);
}

export function getLocale(): Locale {
  return i18n.language === "de" ? "de" : "en";
}

function getDateFnsLocale(locale: Locale) {
  return locale === "de" ? deLocale : enUS;
}

export function formatLocalDate(dateIso: string, locale: Locale = getLocale()) {
  // dateIso: YYYY-MM-DD
  const dt = parse(dateIso, "yyyy-MM-dd", new Date(), { locale: getDateFnsLocale(locale) });
  if (Number.isNaN(dt.getTime())) return dateIso;
  return locale === "de" ? format(dt, "dd.MM.yyyy") : format(dt, "MMMM d, yyyy");
}

export function formatLocalTime(time24: string, locale: Locale = getLocale()) {
  // time24: HH:mm
  const dt = parse(time24, "HH:mm", new Date(), { locale: getDateFnsLocale(locale) });
  if (Number.isNaN(dt.getTime())) return time24;
  return locale === "de" ? format(dt, "HH:mm") : format(dt, "h:mm a");
}

export function formatLocalMonthShort(dateIso: string, locale: Locale = getLocale()) {
  const dt = parse(dateIso, "yyyy-MM-dd", new Date(), { locale: getDateFnsLocale(locale) });
  if (Number.isNaN(dt.getTime())) return dateIso;
  return format(dt, "MMM", { locale: getDateFnsLocale(locale) });
}

export function formatLocalDayNumber(dateIso: string, locale: Locale = getLocale()) {
  const dt = parse(dateIso, "yyyy-MM-dd", new Date(), { locale: getDateFnsLocale(locale) });
  if (Number.isNaN(dt.getTime())) return dateIso;
  return format(dt, "d", { locale: getDateFnsLocale(locale) });
}

export default i18n;
