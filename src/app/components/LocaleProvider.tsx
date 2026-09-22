"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type LanguageCode = "en" | "fr" | "de" | "es" | "it" | "ja" | "ko";
export type CurrencyCode = "INR" | "EUR" | "USD" | "GBP" | "JPY" | "KRW" | "AED" | "CAD" | "AUD" | "NZD";

type LocaleContextValue = {
  language: LanguageCode;
  currency: CurrencyCode;
  ratesReady: boolean;
  setLanguage: (language: LanguageCode) => void;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (basePriceInr: number) => string;
  approxLabel: string;
  t: (key: TranslationKey) => string;
};

type TranslationKey = keyof typeof translations.en;

const languageByCountry: Record<string, LanguageCode> = { FR: "fr", DE: "de", ES: "es", IT: "it", JP: "ja", KR: "ko" };
const currencyByCountry: Record<string, CurrencyCode> = { IN: "INR", FR: "EUR", DE: "EUR", ES: "EUR", IT: "EUR", US: "USD", GB: "GBP", JP: "JPY", KR: "KRW", AE: "AED", CA: "CAD", AU: "AUD", NZ: "NZD" };
const currencyLocales: Record<CurrencyCode, string> = { INR: "en-IN", EUR: "fr-FR", USD: "en-US", GBP: "en-GB", JPY: "ja-JP", KRW: "ko-KR", AED: "en-AE", CAD: "en-CA", AUD: "en-AU", NZD: "en-NZ" };
const languageNames: Record<LanguageCode, string> = { en: "EN", fr: "FR", de: "DE", es: "ES", it: "IT", ja: "JA", ko: "KO" };

const translations = {
  en: { international: "International Trips", national: "Explore India", offers: "Offers", about: "About Us", contact: "Contact Us", plan: "Plan Your Trip", login: "Login", journeys: "Journeys worth taking.", allPackages: "Choose your next story", exploreTrip: "Explore trip", from: "from", days: "days" },
  fr: { international: "Voyages internationaux", national: "Explorer l'Inde", offers: "Offres", about: "À propos", contact: "Contact", plan: "Planifiez votre voyage", login: "Connexion", journeys: "Des voyages qui comptent.", allPackages: "Choisissez votre prochaine histoire", exploreTrip: "Explorer le voyage", from: "à partir de", days: "jours" },
  de: { international: "Internationale Reisen", national: "Indien entdecken", offers: "Angebote", about: "Über uns", contact: "Kontakt", plan: "Reise planen", login: "Anmelden", journeys: "Reisen, die sich lohnen.", allPackages: "Wählen Sie Ihre nächste Geschichte", exploreTrip: "Reise entdecken", from: "ab", days: "Tage" },
  es: { international: "Viajes internacionales", national: "Explorar India", offers: "Ofertas", about: "Sobre nosotros", contact: "Contacto", plan: "Planifica tu viaje", login: "Iniciar sesión", journeys: "Viajes que merecen la pena.", allPackages: "Elige tu próxima historia", exploreTrip: "Explorar viaje", from: "desde", days: "días" },
  it: { international: "Viaggi internazionali", national: "Esplora l'India", offers: "Offerte", about: "Chi siamo", contact: "Contatti", plan: "Pianifica il viaggio", login: "Accedi", journeys: "Viaggi da vivere.", allPackages: "Scegli la tua prossima storia", exploreTrip: "Esplora il viaggio", from: "da", days: "giorni" },
  ja: { international: "海外旅行", national: "インドを探す", offers: "お得な情報", about: "私たちについて", contact: "お問い合わせ", plan: "旅行を計画", login: "ログイン", journeys: "心に残る旅。", allPackages: "次の物語を選ぶ", exploreTrip: "旅を見る", from: "から", days: "日間" },
  ko: { international: "해외 여행", national: "인도 여행", offers: "특가", about: "회사 소개", contact: "문의하기", plan: "여행 계획하기", login: "로그인", journeys: "떠날 가치가 있는 여행.", allPackages: "다음 이야기를 선택하세요", exploreTrip: "여행 보기", from: "부터", days: "일" },
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [rates, setRates] = useState<Record<string, number>>({ INR: 1 });
  const [ratesReady, setRatesReady] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("wayfarer-language") as LanguageCode | null;
    const savedCurrency = window.localStorage.getItem("wayfarer-currency") as CurrencyCode | null;
    if (savedLanguage) setLanguageState(savedLanguage);
    if (savedCurrency) setCurrencyState(savedCurrency);

    const countryRequest = savedLanguage && savedCurrency ? Promise.resolve(null) : fetch("/api/location").then((response) => response.ok ? response.json() : null).catch(() => null);
    countryRequest.then((location) => {
      if (!location?.country) return;
      if (!savedLanguage) setLanguageState(languageByCountry[location.country] || "en");
      if (!savedCurrency) setCurrencyState(currencyByCountry[location.country] || "INR");
    });

    fetch("/api/rates").then((response) => response.ok ? response.json() : null).then((data) => {
      if (data?.rates) setRates({ INR: 1, ...data.rates });
    }).catch(() => undefined).finally(() => setRatesReady(true));
  }, []);

  function setLanguage(languageValue: LanguageCode) {
    setLanguageState(languageValue);
    window.localStorage.setItem("wayfarer-language", languageValue);
  }

  function setCurrency(currencyValue: CurrencyCode) {
    setCurrencyState(currencyValue);
    window.localStorage.setItem("wayfarer-currency", currencyValue);
  }

  const value = useMemo(() => ({
    language,
    currency,
    ratesReady,
    setLanguage,
    setCurrency,
    formatPrice: (basePriceInr: number) => {
      const converted = basePriceInr * (rates[currency] || 1);
      return new Intl.NumberFormat(currencyLocales[currency], { style: "currency", currency, maximumFractionDigits: currency === "INR" ? 0 : 2 }).format(converted);
    },
    approxLabel: currency === "INR" ? "" : "approx.",
    t: (key: TranslationKey) => translations[language][key] || translations.en[key],
  }), [currency, language, rates, ratesReady]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function languageLabel(language: LanguageCode) { return languageNames[language]; }
