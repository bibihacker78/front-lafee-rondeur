import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Trier from "../components/Trier";
import { getProductsByCategoryId } from "../api";
import DecorativeBlobs from "../components/DecorativeBlobs";

const CategoriePage = ({ titre, categoryId }) => {
    const [products, setProducts] = useState([]);

    const getImageUrl = (path) => {
        if (!path) return "";
        const slash = path.startsWith("/") ? "" : "/";
        return `http://localhost:3000${slash}${path}`;
    };

    const createCard = (item) => {
        if (!item?.image_principale) return null;

        const baseImage = getImageUrl(item.image_principale);

        let hoverImage = baseImage;

        console.log("📦 Item complet reçu :", item);
        console.log("🖼️ Images secondaires :", item.images_secondaires);

        if (
            Array.isArray(item.images_secondaires) &&
            item.images_secondaires.length > 0
        ) {
            const first = item.images_secondaires[0];
            console.log("🎯 Première image secondaire :", first);
            console.log("📝 Type :", typeof first);
            // L'API retourne directement les URLs, pas des objets
            hoverImage = typeof first === "string" ? getImageUrl(first) : getImageUrl(first.image_url || first.url || first.path || "");
            console.log("✅ hoverImage finalement :", hoverImage);
        }

        return (
            <Card
                key={item.id}
                id={item.id}
                name={item.nom}
                price={item.prix}
                image={baseImage}
                imghover={hoverImage}
                variants={categoryId === 4 ? item.variants : []}
            />
        );
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("🔍 categoryId reçu :", categoryId);
                const res = await getProductsByCategoryId(categoryId);
                console.log("✅ Réponse API :", res);

                if (Array.isArray(res)) setProducts(res);
                else if (res.produits) setProducts(res.produits);
                else setProducts([]);
            } catch (e) {
                console.error("❌ Erreur :", e);
            }
        };

        if (categoryId) fetchData(); // Ne fetch que si categoryId existe
    }, [categoryId]); // ✓ Ajoute categoryId

    return (
        <div className="relative">
            <Header />

            {/* BLOBS ROSES – décor premium */}
            <DecorativeBlobs />

            {/* Zone du titre + tri */}
            <div className="max-w-[1200px] mx-auto px-4 pt-8">
                <Trier nom={titre} />
            </div>

            {/* Grille produits */}
            <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-20">
                {products.length > 0 ? (
                    products.map(createCard)
                ) : (
                    <p className="text-gray-500 text-center col-span-full">
                        Aucun produit trouvé dans cette catégorie.
                    </p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CategoriePage;
