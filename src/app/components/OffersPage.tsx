"use client";

import { useState } from "react";
import TripEnquiryModal from "./TripEnquiryModal";
import { TravelOffer } from "./offerData";
import { useLocale } from "./LocaleProvider";

type OffersPageProps = {
  offers: TravelOffer[];
};

export default function OffersPage({ offers }: OffersPageProps) {
  const { formatPrice, approxLabel } = useLocale();
  const [selectedOffer, setSelectedOffer] = useState<TravelOffer | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#1d2731]">
      <header className="border-b border-[#e6e2d8] bg-white"><div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-10"><a href="/" aria-label="GoAvir home"><img src="/images/goavir-logo.png" alt="GoAvir" className="brand-logo" /></a><a href="/" className="text-sm font-semibold text-[#12283d]">← Back to home</a></div></header>
      <section className="relative min-h-[430px] overflow-hidden bg-cover bg-center text-white" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85)" }}><div className="absolute inset-0 bg-[#12283d]/55" /><div className="relative mx-auto flex min-h-[430px] max-w-[1280px] items-end px-6 pb-14 lg:px-10 lg:pb-20"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#f4e7c4]">Limited-time journeys</p><h1 className="serif mt-4 text-6xl tracking-[-.04em] md:text-8xl">Travel Offers</h1><p className="mt-5 max-w-[560px] text-base leading-7 text-[#edf2f3] md:text-lg">Make your next escape go further with handpicked seasonal offers and special journey pricing.</p></div></div></section>
      <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b98b42]">Travel beautifully, for less</p><h2 className="serif mt-2 text-5xl tracking-[-.04em] text-[#12283d]">Current offers.</h2></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{offers.map((offer) => <article key={offer.id} className="overflow-hidden bg-white shadow-[0_12px_30px_rgba(18,40,61,0.08)]"><div className="relative aspect-[4/3] overflow-hidden"><img src={offer.image} alt={offer.destination} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><span className="absolute left-4 top-4 bg-[#d8b16a] px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white">{offer.discount}</span></div><div className="p-6"><h3 className="serif text-3xl text-[#12283d]">{offer.title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-[.12em] text-[#b98b42]">{offer.destination}</p><p className="mt-4 text-sm leading-6 text-[#687570]">{offer.description}</p><div className="mt-5 flex items-end justify-between border-t border-[#ece8df] pt-4"><div><p className="text-xs text-[#8a9690]">{offer.duration} days · from</p><p className="mt-1 text-lg font-bold text-[#12283d]">{formatPrice(offer.price)} {approxLabel} <span className="ml-1 text-xs font-normal text-[#9aa29e] line-through">{formatPrice(offer.originalPrice)}</span></p></div><button type="button" onClick={() => setSelectedOffer(offer)} className="rounded-full bg-[#d8b16a] px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#c99745]">Explore offer</button></div></div></article>)}</div></section>
      {selectedOffer && <TripEnquiryModal trip={selectedOffer} onClose={() => setSelectedOffer(null)} />}
    </main>
  );
}
0

