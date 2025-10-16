import { useEffect, useRef, useState } from "react";

type CarouselProps = {
  images: string[];
  alt?: string;
  autoplay?: boolean;
  interval?: number; // ms
  fullWidth?: boolean;
};

export default function Carousel({
  images,
  alt = "carousel",
  autoplay = true,
  interval = 3000,
  fullWidth = true,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!autoplay || paused) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoplay, paused, interval, images.length]);

  const containerClass = fullWidth
    ? "relative w-full overflow-hidden rounded-3xl shadow-2xl"
    : "relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl";

  return (
    <div
      className={containerClass}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image container */}
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
        <img
          key={index}
          src={images[index]}
          alt={`${alt}-${index}`}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 hover:scale-110"
        />
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent"></div>
      </div>

      {/* Boutons navigation */}
      <button
        onClick={prev}
        aria-label="Précédent"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-900 p-3 rounded-full shadow-md transition-all duration-300"
      >
        ←
      </button>

      <button
        onClick={next}
        aria-label="Suivant"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-900 p-3 rounded-full shadow-md transition-all duration-300"
      >
        →
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
         <button
  key={i}
  onClick={() => setIndex(i)}
  aria-label={`Aller au slide ${i + 1}`} // texte pour lecteurs d’écran
  className={`w-3 h-3 rounded-full transition-all ${
    i === index ? "bg-amber-600 scale-110" : "bg-white/60"
  }`}
></button>

        ))}
      </div>
    </div>
  );
}
