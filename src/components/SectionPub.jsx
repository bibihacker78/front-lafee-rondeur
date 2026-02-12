import React from "react";

const features = [
  {
    icon: "fa-solid fa-truck-fast",
    title: "LIVRAISON RAPIDE",
    text: "Partout en Côte d’Ivoire et en France",
  },
  {
    icon: "fa-regular fa-credit-card",
    title: "PAIEMENT SÉCURISÉ",
    text: "Par mobile money et carte Visa",
  },
  {
    icon: "fa-solid fa-certificate",
    title: "SANS EFFETS SECONDAIRES",
    text: "À base d’ingrédients naturels",
  },
  {
    icon: "fa-solid fa-headset",
    title: "ASSISTANCE 24h/24",
    text: "Contactez-nous pour tout besoin",
  },
];

const SectionPub = () => {
  return (
    <div className="w-full py-14 bg-white relative overflow-hidden">
      
      {/* Blob décoratif rose */}
      <div className="absolute -left-20 -top-10 w-60 h-60 bg-[#ff008c22] blur-3xl rounded-full opacity-60 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-20 relative">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-[#f6d8eb] shadow-sm hover:shadow-md transition-all bg-white hover:bg-[#fff8fd]"
          >
            {/* Icon circle */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#ff008c15] text-[#ff008c] shadow-inner mb-4">
              <i className={`${f.icon} text-2xl`}></i>
            </div>

            {/* Title */}
            <h5 className="font-semibold text-gray-900 tracking-wide mb-2">
              {f.title}
            </h5>

            {/* Text */}
            <h6 className="text-sm text-gray-600 leading-relaxed">
              {f.text}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionPub;
