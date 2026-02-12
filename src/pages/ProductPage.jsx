// src/pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Description from "../components/Description";
import AutreProduits from "../components/AutreProduits";
import Separateur from "../components/Separateur";
import SectionPub from "../components/SectionPub";
import { formatPrice, getProduitById, addToCart } from "../api";

// Si tu as déplacé l'image de silhouettes dans public/assets:
// const SILHOUETTE_URL = "/assets/silhouettes.png";
// Sinon, pour test local rapide (fichier téléversé dans l'environnement), utilise :
const SILHOUETTE_URL = "/mnt/data/A_collection_of_four_digital_line_art_illustration.png";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [quantityAdded, setQuantityAdded] = useState(0);

  // récupération du produit
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProduitById(id);
        // normalize response
        const productData = res && res.produit ? res.produit : res;
        setProduct(productData || null);

        // build images
        if (productData) {
          const base = "http://localhost:3000";
          const main = productData.image_principale
            ? (productData.image_principale.startsWith("http")
                ? productData.image_principale
                : `${base}/${productData.image_principale.replace(/^\//, "")}`)
            : "";

          let secondary = [];
          if (productData.images_secondaires && Array.isArray(productData.images_secondaires)) {
            secondary = productData.images_secondaires.map((img) =>
              typeof img === "string"
                ? `${base}/${img.replace(/^\//, "")}`
                : `${base}/${(img.path || img.url || img.image_path).replace(/^\//, "")}`
            );
          }

          const images = [main, ...secondary].filter(Boolean);
          setAllImages(images);
          setSelectedImageIndex(0);
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) { alert("Connectez-vous pour ajouter au panier"); return; }
      const user = JSON.parse(raw);
      const payload = {
        utilisateur_id: user.id,
        produit_id: product.id,
        quantite: 1,
      };
      await addToCart(payload);
      setQuantityAdded((q) => q + 1);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'ajout au panier");
    }
  };

  if (loading) return <div><Header /><div className="py-40 text-center">Chargement...</div></div>;
  if (!product) return <div><Header /><div className="py-40 text-center">Produit introuvable</div></div>;

  const mainImage = allImages[selectedImageIndex] || "";

  return (
    <div className="bg-white">
      <Header />
      {/* Decorative blobs + silhouette */}
      <div className="relative overflow-hidden">
        {/* large soft blob top-left */}
        <div className="absolute -left-36 -top-24 w-80 h-80 rounded-full bg-[#ff008c22] blur-3xl opacity-60 pointer-events-none" />
        {/* silhouette centered behind testimonial area (we reuse it here for hero visual) */}
        <img
          src={SILHOUETTE_URL}
          alt="silhouette"
          className="absolute right-0 top-10 w-96 opacity-20 pointer-events-none select-none -z-10"
          style={{ filter: "blur(6px)" }}
        />

        {/* Product content container */}
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Gallery */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white">
                <img
                  src={mainImage}
                  alt={product.nom}
                  className="w-full max-h-[640px] object-contain bg-white"
                />
              </div>

              <div className="mt-6 flex gap-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                      idx === selectedImageIndex ? "ring-2 ring-[#ff008c66] scale-105" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt={`mini-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-transparent hover:border-[#ff008c22] transition-all">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{product.nom}</h1>

                <div className="mt-4 flex items-center gap-4">
                  <div className="text-2xl md:text-3xl font-extrabold text-[#ff008c]">
                    {formatPrice(product.prix)}
                  </div>
                  <div className="text-sm text-gray-500">| Référence: {product.reference || product.id}</div>
                </div>

                <p className="mt-4 text-gray-600 leading-relaxed">{(product.description || "").slice(0, 220)}{(product.description || "").length > 220 ? "…" : ""}</p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff008c] to-[#cc317e] text-white font-semibold shadow-md hover:scale-[1.01] transition transform"
                  >
                    AJOUTER AU PANIER
                  </button>

                  <button
                    onClick={() => {
                      // quick buy: add then go to panier
                      handleAddToCart();
                      window.location.href = "/panier";
                    }}
                    className="px-6 py-3 rounded-full border border-[#ff008c33] text-[#ff008c] font-semibold bg-white hover:bg-[#ff008c08] transition"
                  >
                    ACHETER MAINTENANT
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fa-solid fa-truck text-[#ff008c]"></i>
                    <span>Livraison estimée 2-4 jours</span>
                  </div>

                  <div className="flex items-center gap-3 text-2xl text-gray-400">
                    <a className="hover:text-[#ff008c]" href="#"><i className="fa-brands fa-facebook"></i></a>
                    <a className="hover:text-[#ff008c]" href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a className="hover:text-[#ff008c]" href="#"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <span className="font-medium">Articles ajoutés :</span> {quantityAdded}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs / Description */}
          <div className="mt-10">
            <Description
              benefices={product.benefices}
              conseil_utilisation={product.conseil_utilisation}
              ingredients={product.ingredients}
              user={JSON.parse(localStorage.getItem("user") || "null")}
              produit_id={product.id}
            />
          </div>

          {/* Autres sections */}
          <div className="mt-12">
            <Separateur titre="Vous aimeriez aussi" />
            <div className="mt-8">
              <AutreProduits />
            </div>
          </div>

          <div className="mt-12">
            <SectionPub />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
