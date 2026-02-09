import { useState, useEffect, useRef } from "react";
import "../styles/services.css";

function ServiceCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    swipeStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (swipeStartX.current === null) return;

    const diff = swipeStartX.current - e.changedTouches[0].clientX;

    if (diff > 40) {
      // swipe left
      setIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -40) {
      // swipe right
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    swipeStartX.current = null;
  }

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={images[index]} alt="service" className="carousel-image" />

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ServiceCarousel;
