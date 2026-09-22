"use client";

import { CurrencyCode, LanguageCode, languageLabel, useLocale } from "./LocaleProvider";

const languages: LanguageCode[] = ["en", "fr", "de", "es", "it", "ja", "ko"];
const currencies: CurrencyCode[] = ["INR", "EUR", "USD", "GBP", "JPY", "KRW", "AED", "CAD", "AUD", "NZD"];

export default function LocaleControls() {
  const { language, currency, setLanguage, setCurrency } = useLocale();
  return <div className="locale-controls" aria-label="Language and currency preferences"><label>Language <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)} aria-label="Language">{languages.map((item) => <option key={item} value={item}>{languageLabel(item)}</option>)}</select></label><label>Currency <select value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyCode)} aria-label="Currency">{currencies.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div>;
}
