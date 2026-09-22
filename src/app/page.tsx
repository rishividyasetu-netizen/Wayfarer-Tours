"use client";

import { FormEvent, useMemo, useState } from "react";
import DestinationCarousel from "./components/DestinationCarousel";
import { useLocale } from "./components/LocaleProvider";
import LocaleControls from "./components/LocaleControls";

type TourType = "ALL" | "DOMESTIC" | "INBOUND" | "OUTBOUND";
type TripFilter = "INTERNATIONAL" | "NATIONAL";
type Tour = { id: string; title: string; type: Exclude<TourType, "ALL">; category: "International" | "National"; destination: string; duration: number; price: number; currency: string; image: string; accent: string; note: string };

const tours: Tour[] = [
  { id: "monsoon-in-munnar", title: "Europe Trip", type: "OUTBOUND", category: "International", destination: "Europe", duration: 10, price: 210000, currency: "INR", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85", accent: "#b6c7b1", note: "Cities, alpine scenery & golden evenings" },
  { id: "the-icelandic-loop", title: "North East India Trip", type: "DOMESTIC", category: "National", destination: "Sikkim, India", duration: 8, price: 64900, currency: "INR", image: "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=1200&q=85", accent: "#d7e6e5", note: "Dramatic mountains & Himalayan greenery" },
  { id: "a-week-in-rajasthan", title: "North America Trip", type: "OUTBOUND", category: "International", destination: "New York, USA", duration: 8, price: 185000, currency: "INR", image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1200&q=85", accent: "#f0c7a3", note: "Iconic cities & memorable skylines" },
  { id: "quiet-konkan", title: "South India Trip", type: "DOMESTIC", category: "National", destination: "Maharashtra, India", duration: 4, price: 22400, currency: "INR", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85", accent: "#e6c8c0", note: "Seafood, palms & slow roads" },
];

export default function Home() {
  const { formatPrice, t, currency } = useLocale();
  const [filter, setFilter] = useState<TripFilter | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const filteredTours = useMemo(() => {
    if (!filter) return tours;
    return tours.filter((tour) => filter === "NATIONAL" ? tour.type === "DOMESTIC" : tour.type !== "DOMESTIC");
  }, [filter]);

  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTour) return;
    await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tourId: selectedTour.id, travelersCount: travelers, travelDate: new FormData(event.currentTarget).get("date"), currency }) });
    setSubmitted(true);
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroVideo = {
    src: "/videos/hero-travel.mp4",
    poster: "/images/hero-travel-poster.jpg",
  };

  const internationalDropdown = [
    "Europe Trips",
    "North America Trips",
    "South Asia Trips",
    "Middle East Trips",
    "Oceania Country Trips",
  ];

  const indiaDropdown = [
    "All India Trips",
    "Golden Triangle Trips",
    "North East Trips",
    "South India Trips",
    "North India Trips",
    "Pilgrimage Trips",
  ];

  return (
    <main>
      <header className="header-shell">
        <div className="mini-header hidden text-[11px] font-medium text-[#4c5a68] md:block">
          <div className="utility-bar mx-auto flex max-w-[1280px] items-center justify-between">
            <div className="utility-contact">
              <span className="inline-flex items-center gap-2"><span>📞</span> Toll-Free: 1800-XXX-XXXX</span>
            </div>
            <div className="utility-links">
              <LocaleControls />
              <span>Customer Support</span>
              <span>Blog</span>
              <span className="inline-flex items-center gap-2">♡ Wishlist</span>
            </div>
          </div>
        </div>

        <nav className="main-nav">
          <div className="main-nav-row">
            <a href="#top" aria-label="GoAvir home"><img src="/images/goavir-logo.png" alt="GoAvir" className="brand-logo" /></a>

            <div className="desktop-nav-links">
              <div className="nav-item relative">
                <a href="/international" className="nav-link">{t("international")} <span className="text-xs">▾</span></a>
                <div className="dropdown-panel absolute left-0 top-full mt-5 w-64 rounded-xl border border-[#e8e1d7] bg-white p-3 shadow-[0_20px_50px_rgba(18,40,61,0.08)]">
                  {internationalDropdown.map((item) => (
                    <a key={item} href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1d2731] transition hover:bg-[#f5f2eb] hover:text-[#12283d]">{item}</a>
                  ))}
                </div>
              </div>

              <div className="nav-item relative">
                <a href="/national" className="nav-link">{t("national")} <span className="text-xs">▾</span></a>
                <div className="dropdown-panel absolute left-0 top-full mt-5 w-64 rounded-xl border border-[#e8e1d7] bg-white p-3 shadow-[0_20px_50px_rgba(18,40,61,0.08)]">
                  {indiaDropdown.map((item) => (
                    <a key={item} href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1d2731] transition hover:bg-[#f5f2eb] hover:text-[#12283d]">{item}</a>
                  ))}
                </div>
              </div>

              <a href="#offers-banner" className="nav-link">{t("offers")}</a>
              <a href="/about" className="nav-link">{t("about")}</a>
              <a href="/contact" className="nav-link">{t("contact")}</a>
              <a href="#journeys" className="cta-pill rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em]">{t("plan")}</a>
              <a href="/login" className="nav-link">{t("login")}</a>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="hamburger-button flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe3dc] bg-white text-[#12283d] shadow-sm"
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>
          </div>

          <div className={`mobile-menu lg:hidden ${mobileMenuOpen ? "open" : ""}`}>
            <div className="mt-5 space-y-4 rounded-2xl border border-[#e7e2d9] bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-[#f7f4ef] px-3 py-2 text-xs text-[#4c5a68]">
                <div className="flex items-center gap-2">📞 <span>Toll-Free: 1800-XXX-XXXX</span></div>
              </div>

              <div className="space-y-3 text-sm font-medium text-[#12283d]">
                <a href="/international" className="block rounded-xl border border-[#ece6dc] p-3">
                  <div className="mb-2 font-semibold">International Trips</div>
                  <div className="space-y-1.5 text-[#3d4d5a]">
                    {internationalDropdown.map((item) => <div key={item}>{item}</div>)}
                  </div>
                </a>

                <a href="/national" className="block rounded-xl border border-[#ece6dc] p-3">
                  <div className="mb-2 font-semibold">Explore India</div>
                  <div className="space-y-1.5 text-[#3d4d5a]">
                    {indiaDropdown.map((item) => <div key={item}>{item}</div>)}
                  </div>
                </a>

                <a href="#offers-banner" className="block rounded-xl px-3 py-2 hover:bg-[#f7f4ef]">Offers</a>
                <a href="/about" className="block rounded-xl px-3 py-2 hover:bg-[#f7f4ef]">About Us</a>
                <a href="/contact" className="block rounded-xl px-3 py-2 hover:bg-[#f7f4ef]">Contact Us</a>
                <a href="/#journeys" className="cta-pill block rounded-full px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em]">Plan Your Trip</a>
                <a href="/login" className="block rounded-xl px-3 py-2 hover:bg-[#f7f4ef]">Login</a>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#ece6dc] pt-3 text-xs text-[#51606d]">
                <LocaleControls />
                <span>Customer Support</span>
                <span>Blog</span>
                <span>♡ Wishlist</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="hero-video-shell" aria-label="Cinematic travel video hero">
        <video
          className="w-full"
          src={heroVideo.src}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
        />
        <div className="hero-video-overlay" aria-hidden="true" />
      
      </section>

      <DestinationCarousel />

      <section id="journeys" className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#ec765e]">{t("allPackages")}</p><h2 className="serif text-5xl tracking-[-.04em] text-[#263b37] md:text-6xl">{t("journeys")}</h2></div><div className="flex flex-wrap gap-2"><button onClick={() => setFilter("INTERNATIONAL")} className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[.12em] transition ${filter === "INTERNATIONAL" ? "border-[#263b37] bg-[#263b37] text-white" : "border-[#c9d1ca] text-[#687570] hover:border-[#263b37]"}`}>International Trip</button><button onClick={() => setFilter("NATIONAL")} className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[.12em] transition ${filter === "NATIONAL" ? "border-[#263b37] bg-[#263b37] text-white" : "border-[#c9d1ca] text-[#687570] hover:border-[#263b37]"}`}>National Trip</button></div></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{filteredTours.map((tour) => <article key={tour.id} className="trip-card cursor-pointer overflow-hidden bg-[#fffdf9]" onClick={() => { window.location.href = tour.category === "International" ? "/international" : "/national"; }}><div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: tour.accent }}><div className="absolute inset-0 bg-cover bg-center transition duration-500 hover:scale-105" style={{ backgroundImage: `url(${tour.image})` }} /><span className="absolute left-4 top-4 bg-[#fffdf9] px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#263b37]">{tour.category}</span></div><div className="p-5"><div className="flex justify-between gap-3"><div><h3 className="serif text-2xl leading-tight text-[#263b37]">{tour.title}</h3><p className="mt-2 text-xs text-[#687570]">{tour.destination} · {tour.duration} days</p></div><span className="text-xl text-[#ec765e]">↗</span></div><p className="mt-5 border-t border-[#e2e5df] pt-4 text-sm text-[#687570]">{tour.note}</p><p className="mt-4 text-sm font-bold text-[#263b37]">from {formatPrice(tour.price)} <span className="font-normal text-[#687570]">/ person</span></p></div></article>)}</div></section>

      <a id="offers-banner" href="/offers" className="offers-banner-link" aria-label="Explore travel offers">
        <img className="offers-banner-image" src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2480&q=85" alt="Explore GoAvir travel offers" />
      </a>

      <section id="story" className="border-y border-[#d9ded8] bg-[#e8ede5]"><div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-10 lg:py-28"><p className="serif text-4xl leading-[1.12] tracking-[-.03em] text-[#263b37] md:text-5xl">“The best itinerary is the one that leaves a little space for the unexpected.”</p><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#ec765e]">The GoAvir way</p><p className="mt-5 max-w-[520px] text-lg leading-8 text-[#53645e]">We work with people who know their place deeply: the cook who opens her kitchen, the naturalist who knows where the hornbills land, the host who saves a seat by the window. That is what makes a trip feel like yours.</p><div className="mt-7 grid max-w-[480px] grid-cols-3 gap-5 border-t border-[#c3cec3] pt-5 text-xs text-[#53645e]"><span><b className="block text-2xl text-[#263b37]">06</b>years wandering</span><span><b className="block text-2xl text-[#263b37]">28</b>slow routes</span><span><b className="block text-2xl text-[#263b37]">4.9/5</b>happy travellers</span></div></div></div></section>

  <footer id="footer" className="bg-[#263b37] px-6 py-12 text-[#d5e0d9] lg:px-10"><div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="serif text-3xl text-[#fffdf9]">GoAvir<span className="text-[#ec765e]">.</span></p><p className="mt-3 text-sm text-[#aebfb5]">Go somewhere that stays with you.</p></div><p className="text-xs text-[#aebfb5]">© 2026 GoAvir Tours</p></div></footer>

      {selectedTour && <div className="fixed inset-0 z-20 flex items-end justify-center bg-[#14221f]/55 p-0 sm:items-center sm:p-6" onClick={() => setSelectedTour(null)}><div className="w-full max-w-[540px] bg-[#fffdf9] p-7 shadow-2xl sm:p-9" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#ec765e]">Reserve your place</p><h2 className="serif mt-2 text-4xl leading-tight text-[#263b37]">{selectedTour.title}</h2><p className="mt-2 text-sm text-[#687570]">{selectedTour.destination} · {selectedTour.duration} days · from {formatPrice(selectedTour.price)}</p></div><button aria-label="Close booking form" onClick={() => setSelectedTour(null)} className="text-2xl text-[#687570]">×</button></div>{submitted ? <div className="mt-10 border border-[#b6c7b1] bg-[#e8ede5] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#263b37]">Request received</p><p className="serif mt-2 text-3xl text-[#263b37]">You are on your way.</p><p className="mt-3 text-sm leading-6 text-[#53645e]">Our travel team will confirm availability and send a secure payment link shortly.</p></div> : <form onSubmit={handleBooking} className="mt-8 space-y-5"><label className="block text-sm font-semibold text-[#263b37]">Preferred travel date<input required name="date" type="date" className="mt-2 block w-full border border-[#cbd4cc] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#ec765e]" /></label><label className="block text-sm font-semibold text-[#263b37]">Travellers<select value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} className="mt-2 block w-full border border-[#cbd4cc] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#ec765e]">{[1,2,3,4,5,6].map((number) => <option key={number} value={number}>{number} {number === 1 ? "traveller" : "travellers"}</option>)}</select></label><div className="flex items-center justify-between border-t border-[#e2e5df] pt-5"><span className="text-sm text-[#687570]">Estimated total</span><strong className="text-xl text-[#263b37]">{formatPrice(selectedTour.price * travelers)}</strong></div><button className="w-full rounded-full bg-[#ec765e] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#d9634e]">Continue to checkout <span className="ml-2">→</span></button><p className="text-center text-[11px] text-[#8a9690]">No payment taken yet. Availability is confirmed first.</p></form>}</div></div>}
    </main>
  );
}
