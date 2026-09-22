"use client";

import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";

type Destination = {
  name: string;
  image: string;
  href: string;
};

// Replace, reorder, or extend this list as destination content changes.
const destinations: Destination[] = [
  { name: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85", href: "#" },
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85", href: "#" },
  { name: "Sri Lanka", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85", href: "#" },
  { name: "Andaman", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85", href: "#" },
  { name: "Dubai", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85", href: "#" },
  { name: "Vietnam", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=85", href: "#" },
];

const slideDuration = 700;
const pauseDuration = 2000;
const cloneCount = 3;

export default function DestinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slideOffset, setSlideOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const loopedDestinations = useMemo(() => [
    ...destinations.slice(-cloneCount),
    ...destinations,
    ...destinations.slice(0, cloneCount),
  ], []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");
      setSlideOffset(firstCard.getBoundingClientRect().width + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = window.setTimeout(() => {
      setTransitionEnabled(true);
      setCurrentIndex((index) => index + 1);
    }, pauseDuration);

    return () => window.clearTimeout(timer);
  }, [currentIndex, isDragging, isPaused]);

  function move(direction: number) {
    setTransitionEnabled(true);
    setCurrentIndex((index) => index + direction);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStart.current = event.clientX;
    dragDelta.current = 0;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    dragDelta.current = event.clientX - dragStart.current;
  }

  function handlePointerUp() {
    if (Math.abs(dragDelta.current) > 45) move(dragDelta.current < 0 ? 1 : -1);
    dragStart.current = null;
    dragDelta.current = 0;
    setIsDragging(false);
  }

  function handleTransitionEnd() {
    if (currentIndex === destinations.length + cloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(cloneCount);
    }
    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(destinations.length);
    }
  }

  return (
    <section className="destination-section" aria-label="Explore destinations">
      <div className="destination-carousel-frame">
        <button type="button" aria-label="Previous destinations" onClick={() => move(-1)} className="destination-arrow destination-arrow-left">←</button>
        <div
          className="destination-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="destination-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * slideOffset}px)`,
              transition: transitionEnabled ? `transform ${slideDuration}ms cubic-bezier(.22,.61,.36,1)` : "none",
            }}
          >
            {loopedDestinations.map((destination, index) => (
              <a key={`${destination.name}-${index}`} href={destination.href} className="destination-card" draggable={false}>
                <img src={destination.image} alt={destination.name} draggable={false} />
                <span className="destination-card-overlay" />
                <span className="destination-name">{destination.name}</span>
              </a>
            ))}
          </div>
        </div>
        <button type="button" aria-label="Next destinations" onClick={() => move(1)} className="destination-arrow destination-arrow-right">→</button>
      </div>
    </section>
  );
}