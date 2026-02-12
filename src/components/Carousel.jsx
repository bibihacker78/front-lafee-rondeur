import React, { useState, useEffect } from "react";

const images = [
  "/assets/Carousel3.jpg",
  "/assets/Carousel2.jpg",
  "/assets/Carousel3.jpg",
];

export default function CarouselPremium() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  function PrevArrow({ onClick }) {
  return (
    <button
      aria-label="Prev"
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
      bg-[#ff008c20] text-[#ff008c] hover:bg-[#ff008c30] 
      w-10 h-10 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm"
    >
      <i className="fa-solid fa-chevron-left" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      aria-label="Next"
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
      bg-[#ff008c20] text-[#ff008c] hover:bg-[#ff008c30]
      w-10 h-10 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm"
    >
      <i className="fa-solid fa-chevron-right" />
    </button>
  );
}


  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 
          ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Arrows */}
      <button
        onClick={() => setIndex((index - 1 + images.length) % images.length)}
        className="absolute top-1/2 left-6 -translate-y-1/2 
          bg-white/60 hover:bg-white text-rose-deep
          rounded-full w-12 h-12 flex items-center justify-center shadow-rose backdrop-blur-md"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <button
        onClick={() => setIndex((index + 1) % images.length)}
        className="absolute top-1/2 right-6 -translate-y-1/2 
          bg-white/60 hover:bg-white text-rose-deep
          rounded-full w-12 h-12 flex items-center justify-center shadow-rose backdrop-blur-md"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
