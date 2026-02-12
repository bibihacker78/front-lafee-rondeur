// src/components/Description.jsx
import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { addAvis, getAvisByProduit } from "../api";

export default function Description({ benefices, conseil_utilisation, ingredients, user, produit_id }) {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [avisList, setAvisList] = useState([]);

  useEffect(() => {
    if (activeTab === "avis") {
      getAvisByProduit(produit_id).then((res) => setAvisList(res || []));
    }
  }, [activeTab, produit_id]);

  const handleSubmitAvis = async (e) => {
    e.preventDefault();
    const data = {
      produit_id,
      note: rating,
      commentaire: e.target.avis.value,
    };
    if (user) data.utilisateur_id = user.id;
    else {
      data.nom = e.target.nom.value;
      data.email = e.target.email.value;
    }
    await addAvis(data);
    const avis = await getAvisByProduit(produit_id);
    setAvisList(avis || []);
    e.target.reset();
    setRating(0);
    setActiveTab("avis");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#f3f0f3] p-6 md:p-8 mt-6">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "description" ? "bg-[#ff008c] text-white" : "bg-[#fff] text-gray-700 border border-gray-200"}`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setActiveTab("avis")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "avis" ? "bg-[#ff008c] text-white" : "bg-[#fff] text-gray-700 border border-gray-200"}`}
        >
          AVIS
        </button>
        <button
          onClick={() => setActiveTab("paiements")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "paiements" ? "bg-[#ff008c] text-white" : "bg-[#fff] text-gray-700 border border-gray-200"}`}
        >
          PAIEMENTS & LIVRAISON
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "description" && (
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h4 className="font-medium text-lg mb-2">Bénéfices</h4>
              <p>{benefices || "Non renseigné."}</p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">Conseil d'utilisation</h4>
              <p>{conseil_utilisation || "Non renseigné."}</p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">Ingrédients</h4>
              <p>{ingredients || "Non renseigné."}</p>
            </div>
          </div>
        )}

        {activeTab === "avis" && (
          <div className="space-y-6">
            <form onSubmit={handleSubmitAvis} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Votre note</label>
                <StarRating totalStars={5} onRatingChange={(r) => setRating(r)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Votre avis</label>
                <textarea name="avis" className="w-full border rounded-md p-3 min-h-[120px]" required />
              </div>

              {!user && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input name="nom" placeholder="Nom" className="p-3 border rounded-md" required />
                  <input name="email" placeholder="Email" type="email" className="p-3 border rounded-md" required />
                </div>
              )}

              <div>
                <button className="px-6 py-3 rounded-full bg-[#ff008c] text-white font-semibold">Soumettre l'avis</button>
              </div>
            </form>

            <div className="divide-y divide-gray-100">
              {(!avisList || avisList.length === 0) ? (
                <p className="text-gray-500 py-6">Aucun avis pour ce produit.</p>
              ) : (
                avisList.map((a) => (
                  <div key={a.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{a.utilisateur_nom || a.nom || "Utilisateur"}</div>
                      <div className="text-sm text-gray-500">{new Date(a.date_avis).toLocaleDateString?.() || ""}</div>
                    </div>
                    <div className="mt-2 text-gray-700">
                      <div className="text-yellow-400 mb-2">
                        {"★".repeat(a.note)}{"☆".repeat(5 - a.note)}
                      </div>
                      <div>{a.commentaire}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "paiements" && (
          <div className="prose max-w-none text-gray-700">
            <h3>Paiements</h3>
            <p>Vous pouvez payer par Orange Money, carte (VISA/Mastercard), Wari, etc. Paiement sécurisé.</p>
            <h3>Livraison</h3>
            <p>Livraison estimée sous 2-4 jours ouvrés (variable selon pays).</p>
          </div>
        )}
      </div>
    </div>
  );
}
