"use client";

import { useState } from "react";
import TripEnquiryModal from "./TripEnquiryModal";
import { DiscoveryTrip } from "./tripData";
import { useLocale } from "./LocaleProvider";

type TripDiscoveryPageProps = {
  kind: "International" | "National";
  trips: DiscoveryTrip[];
  heroImage: string;
  intro: string;
};

export default function TripDiscoveryPage({ kind, trips, heroImage, intro }: TripDiscoveryPageProps) {
  const { formatPrice, t, approxLabel } = useLocale();
  const [selectedTrip, setSelectedTrip] = useState<DiscoveryTrip | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#1d2731]">
      <header className="border-b border-[#e6e2d8] bg-white"><div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-10"><a href="/" aria-label="GoAvir home"><img src="/images/goavir-logo.png" alt="GoAvir" className="brand-logo" /></a><a href="/" className="text-sm font-semibold text-[#12283d]">← Back to home</a></div></header>
      <section className="relative min-h-[430px] overflow-hidden bg-cover bg-center text-white" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-[#12283d]/55" />
        <div className="relative mx-auto flex min-h-[430px] max-w-[1280px] items-end px-6 pb-14 lg:px-10 lg:pb-20"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#f4e7c4]">Curated journeys · {kind}</p><h1 className="serif mt-4 text-6xl tracking-[-.04em] md:text-8xl">{kind} Trips</h1><p className="mt-5 max-w-[560px] text-base leading-7 text-[#edf2f3] md:text-lg">{intro}</p></div></div>
      </section>
      <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b98b42]">{t("allPackages")}</p><h2 className="serif mt-2 text-5xl tracking-[-.04em] text-[#12283d]">Explore {kind.toLowerCase()} journeys.</h2></div><p className="hidden text-sm text-[#687570] md:block">{trips.length} handpicked packages</p></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{trips.map((trip) => <article key={trip.id} className="overflow-hidden bg-white shadow-[0_12px_30px_rgba(18,40,61,0.08)]"><div className="relative aspect-[4/3] overflow-hidden"><img src={trip.image} alt={trip.destination} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#12283d]">{trip.category}</span></div><div className="p-6"><h3 className="serif text-3xl text-[#12283d]">{trip.title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-[.12em] text-[#b98b42]">{trip.destination}</p><p className="mt-4 text-sm leading-6 text-[#687570]">{trip.description}</p><div className="mt-5 flex items-end justify-between border-t border-[#ece8df] pt-4"><div><p className="text-xs text-[#8a9690]">{trip.duration} {t("days")} · {t("from")}</p><p className="mt-1 text-lg font-bold text-[#12283d]">{formatPrice(trip.price)} {approxLabel}</p></div><button type="button" onClick={() => setSelectedTrip(trip)} className="rounded-full bg-[#d8b16a] px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#c99745]">{t("exploreTrip")}</button></div></div></article>)}</div></section>
      {selectedTrip && <TripEnquiryModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />}
    </main>
  );
}
