import LocaleControls from "./LocaleControls";
import { useLocale } from "./LocaleProvider";

export default function SimplePageHeader() {
  const { t } = useLocale();
  return (
    <header className="border-b border-[#e6e2d8] bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <a href="/" aria-label="GoAvir home"><img src="/images/goavir-logo.png" alt="GoAvir" className="brand-logo" /></a>
        <div className="hidden items-center gap-6 md:flex"><nav className="flex items-center gap-6 text-sm font-semibold text-[#12283d]">
          <a href="/international" className="transition hover:text-[#b98b42]">{t("international")}</a>
          <a href="/national" className="transition hover:text-[#b98b42]">{t("national")}</a>
          <a href="/offers" className="transition hover:text-[#b98b42]">{t("offers")}</a>
          <a href="/about" className="transition hover:text-[#b98b42]">{t("about")}</a>
          <a href="/contact" className="transition hover:text-[#b98b42]">{t("contact")}</a>
          <a href="/#journeys" className="rounded-full bg-[#d8b16a] px-4 py-2 text-xs uppercase tracking-[.12em] text-white">{t("plan")}</a>
          <a href="/login" className="transition hover:text-[#b98b42]">{t("login")}</a>
        </nav><LocaleControls /></div>
        <div className="flex items-center gap-4 md:hidden"><LocaleControls /><a href="/" className="text-sm font-semibold text-[#12283d]">Home</a></div>
      </div>
    </header>
  );
}
