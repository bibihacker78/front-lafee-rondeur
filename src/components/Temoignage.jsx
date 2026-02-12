import React, { useState } from "react";

export default function Testimonials() {
  const [i, setI] = useState(0);

  const data = [
    {
      mot: "Qualité",
      texte: "Le service est excellent, j'ai été impressionnée par la rapidité et la qualité.",
      nom: "@Marie Dupont",
    },
    {
      mot: "Professionnalisme",
      texte: "Une équipe très professionnelle qui comprend les besoins.",
      nom: "@Paul Leclerc",
    },
    {
      mot: "Confiance",
      texte: "Je recommande vivement ! Tout a été transparent et fiable.",
      nom: "@Sophie Martin",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
      <div className="relative bg-rose-pastel rounded-xl p-10 shadow-rose">

        <i className="fa-solid fa-quote-left text-5xl text-rose-deep absolute -top-6 left-6"></i>
        <i className="fa-solid fa-quote-right text-5xl text-rose-deep absolute -bottom-6 right-6"></i>

        <h3 className="text-rose-deep font-semibold text-xl tracking-wide mb-6">
          {data[i].mot}
        </h3>

        <p className="text-gray-700 text-lg mb-4 leading-relaxed">{data[i].texte}</p>

        <p className="text-gray-600 italic">{data[i].nom}</p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button onClick={() => setI((i - 1 + data.length) % data.length)}
          className="w-10 h-10 rounded-full bg-rose-pastel text-rose-deep shadow hover:bg-rose-light">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={() => setI((i + 1) % data.length)}
          className="w-10 h-10 rounded-full bg-rose-pastel text-rose-deep shadow hover:bg-rose-light">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
