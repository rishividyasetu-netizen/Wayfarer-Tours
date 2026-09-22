"use client";

import { FormEvent, useState } from "react";
import { DiscoveryTrip } from "./tripData";
import { useLocale } from "./LocaleProvider";

type TripEnquiryModalProps = {
  trip: DiscoveryTrip;
  onClose: () => void;
};

export default function TripEnquiryModal({ trip, onClose }: TripEnquiryModalProps) {
  const { formatPrice, approxLabel, currency } = useLocale();
  const [travelers, setTravelers] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourId: trip.id, tripTitle: trip.title, travelersCount: travelers, travelDate: new FormData(event.currentTarget).get("date"), currency }),
    });
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#12283d]/60 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div className="w-full max-w-[540px] bg-[#fffdf9] p-7 shadow-2xl sm:p-9" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#b98b42]">Enquire about this trip</p>
            <h2 className="serif mt-2 text-4xl leading-tight text-[#12283d]">{trip.title}</h2>
            <p className="mt-2 text-sm text-[#687570]">{trip.destination} · {trip.duration} days · from {formatPrice(trip.price)} {approxLabel}</p>
          </div>
          <button aria-label="Close enquiry form" onClick={onClose} className="text-2xl text-[#687570]">×</button>
        </div>
        {submitted ? (
          <div className="mt-10 border border-[#b6c7b1] bg-[#e8ede5] p-6">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#263b37]">Enquiry received</p>
            <p className="serif mt-2 text-3xl text-[#263b37]">Your journey starts here.</p>
            <p className="mt-3 text-sm leading-6 text-[#53645e]">Our travel team will confirm availability and contact you with the next steps.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold text-[#263b37]">Preferred travel date<input required name="date" type="date" className="mt-2 block w-full border border-[#cbd4cc] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#b98b42]" /></label>
            <label className="block text-sm font-semibold text-[#263b37]">Travellers<select value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} className="mt-2 block w-full border border-[#cbd4cc] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#b98b42]">{[1, 2, 3, 4, 5, 6].map((number) => <option key={number} value={number}>{number} {number === 1 ? "traveller" : "travellers"}</option>)}</select></label>
            <div className="flex items-center justify-between border-t border-[#e2e5df] pt-5"><span className="text-sm text-[#687570]">Estimated total</span><strong className="text-xl text-[#263b37]">{formatPrice(trip.price * travelers)} {approxLabel}</strong></div>
            <button className="w-full rounded-full bg-[#d8b16a] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#c99745]">Continue to enquiry <span className="ml-2">→</span></button>
            <p className="text-center text-[11px] text-[#8a9690]">No payment taken yet. Availability is confirmed first.</p>
          </form>
        )}
      </div>
    </div>
  );
}
