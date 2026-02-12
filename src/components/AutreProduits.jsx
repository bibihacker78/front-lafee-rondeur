// src/components/AutreProduits.jsx
import React from "react";
import cardData from "../../cardData"; // ou utiliser produits API
import Card from "./Card";

export default function AutreProduits() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardData.slice(0, 8).map((c) => (
          <Card key={c.id} id={c.id} image={c.image} imghover={c.hoverImage || c.image} name={c.name} price={c.price} />
        ))}
      </div>
    </div>
  );
}
