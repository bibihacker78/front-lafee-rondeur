import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../api";

const Card = ({ id, name, price, image, imghover, variants = [] }) => {
  const [activeVariant, setActiveVariant] = useState(
    variants.length > 0 ? variants[0] : null
  );
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = activeVariant?.image || image;
  const hoverImage = activeVariant?.hover || imghover;

  console.log("CARD", { image, imghover, mainImage, hoverImage });

  const handleImgError = (which, src) => {
    console.error(`Image load error (${which}):`, src);
  };


  return (
    <div className="w-[220px] mx-auto">
      {/* IMAGE */}
      <div
        className="relative w-full h-[260px] overflow-hidden rounded-lg group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={mainImage}
          alt={name}
          onError={() => handleImgError("main", mainImage)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <img
          src={hoverImage}
          alt={`${name}-hover`}
          onError={() => handleImgError("hover", hoverImage)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-20"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* COULEURS */}
      {variants.length > 0 && (
        <div className="flex justify-center gap-2 mt-3">
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVariant(v)}
              className={`w-4 h-4 rounded-full border transition 
                ${activeVariant?.color === v.color
                  ? "ring-2 ring-pink-400"
                  : "border-gray-300"
                }`}
              style={{ backgroundColor: v.hex }}
              title={v.color}
            />
          ))}
        </div>
      )}

      {/* INFOS */}
      <div className="flex flex-col items-center mt-3 text-center">
        <h3 className="text-lg font-semibold text-[#ff008c]">{name}</h3>
        <p className="text-gray-700 font-medium text-sm mt-1">
          {formatPrice(price)}
        </p>

        <Link to={`/product/${id}`}>
          <button className="mt-3 border-2 border-[#fc84b4] text-[#fc84b4] font-semibold px-5 py-2 rounded-md transition-all hover:bg-[#fc84b4] hover:text-white">
            Acheter
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
