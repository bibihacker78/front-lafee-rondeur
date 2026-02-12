import React from "react";
import Card from "./Card";

const CardList = ({ cardData }) => {
  if (!cardData || !Array.isArray(cardData)) {
    return <div className="text-center py-10 text-gray-500">Aucune donnée disponible</div>;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
      {cardData.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          image={product.image}
          imghover={product.imghover}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default CardList;
