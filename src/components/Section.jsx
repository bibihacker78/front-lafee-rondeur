import React from "react";
import Slider from "react-slick";
import cardData from "../../cardData1";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Arrows roses premium */
function PrevArrow({ onClick }) {
  return (
    <button
      aria-label="Prev"
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
                 bg-[#ff008c20] hover:bg-[#ff008c35]
                 text-[#ff008c] shadow-md
                 w-10 h-10 rounded-full flex items-center justify-center"
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
                 bg-[#ff008c20] hover:bg-[#ff008c35]
                 text-[#ff008c] shadow-md
                 w-10 h-10 rounded-full flex items-center justify-center"
    >
      <i className="fa-solid fa-chevron-right" />
    </button>
  );
}

const Section = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 2800,
    cssEase: "ease-in-out",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 }},
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false }},
    ],
  };

  return (
    <section className="relative max-w-[1200px] w-[95%] mx-auto mt-20 mb-16">

      {/* Décoration rose pastel moderne */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ff008c15] rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#ff008c15] rounded-full blur-2xl"></div>

      <Slider {...settings} className="overflow-visible">
        {cardData?.length
          ? cardData.map((item) => (
              <div key={item.id} className="px-3">
                <Card
                  id={item.id}
                  image={item.image}
                  imghover={item.hoverImage}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))
          : <p className="text-center w-full">Aucune donnée disponible</p>}
      </Slider>

      {/* CSS slick custom */}
      <style>{`
        .slick-dots {
          bottom: -35px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #ff008c80;
        }
        .slick-dots li.slick-active button:before {
          color: #ff008c !important;
        }
      `}</style>
    </section>
  );
};

export default Section;
