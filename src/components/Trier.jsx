import React from "react";

const Trier = ({ nom }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Titre */}
      <h2 className="text-3xl font-semibold text-[#ff008c]">{nom}</h2>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <a href="/" className="hover:text-[#ff008c]">Accueil</a> /
        <span className="mx-1"></span>
        <span className="text-[#ff008c] font-medium">{nom}</span>
      </nav>

      {/* Ligne séparatrice */}
      <div className="w-full h-[1px] bg-gray-200 mt-2"></div>

      {/* Sélecteur tri */}
      <div className="flex items-center gap-3 mt-2">
        <label className="text-gray-600 font-medium">Trier par :</label>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff008c]/40 focus:border-[#ff008c]">
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name-asc">Nom croissant</option>
          <option value="name-desc">Nom décroissant</option>
        </select>
      </div>
    </div>
  );
};

export default Trier;
