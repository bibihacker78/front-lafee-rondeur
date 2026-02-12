import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Trier from "../components/Trier";
import { getProductsByCategoryId } from "../api";

const HuilePage = () => {
    const [products, setProducts] = useState([]);
    const categoryId = 4
    
    // Fonction utilitaire pour construire les URLs d'images
    const getImageUrl = (path) => {
        if (!path) return ''; // Gestion des valeurs null/undefined
        const slash = path.startsWith('/') ? '' : '/';
        return `http://localhost:3000${slash}${path}`;
    };
    
    // Fonction sécurisée pour créer des cartes
    function creatCard(item) {
        if (!item || !item.image_principale) {
            console.warn("Item invalide ou sans image:", item);
            return null;
        }
        
        // Log détaillé pour comprendre la structure
        console.log("Item complet:", item);
        console.log("Image principale:", item.image_principale);
        console.log("Images secondaires:", item.images_secondaires);
        
        let hoverImageUrl = '';
        
        if (item.images_secondaires) {
            // Si c'est déjà un tableau de chemins
            if (Array.isArray(item.images_secondaires) && item.images_secondaires.length > 0) {
                // Si chaque élément est un objet avec une propriété 'path' ou 'url'
                if (typeof item.images_secondaires[0] === 'object') {
                    const firstImage = item.images_secondaires[0];
                    hoverImageUrl = getImageUrl(firstImage.path || firstImage.url || firstImage.image_path);
                } 
                // Si chaque élément est directement un chemin
                else {
                    hoverImageUrl = getImageUrl(item.images_secondaires[0]);
                }
            }
        }
        
        return (
            <Card
                key={item.id}
                id = {item.id}
                name={item.nom}
                price={item.prix}
                image={getImageUrl(item.image_principale)}
                imghover={hoverImageUrl}
            />
        );
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProductsByCategoryId(categoryId);
                console.log("Réponse complète API:", response);
                
                // Si response est un tableau, l'utiliser directement
                if (Array.isArray(response)) {
                    setProducts(response);
                }
                // Si response est un objet avec une propriété produits
                else if (response.produits) {
                    setProducts(response.produits);
                }
                // Si response est une liste de produits individuels avec leurs images
                else if (Array.isArray(response.produit)) {
                    // Associer chaque produit à ses images secondaires
                    const produitAvecImages = response.produit.map(p => ({
                        ...p,
                        images_secondaires: response.images_secondaires.filter(
                            img => img.produit_id === p.id
                        )
                    }));
                    setProducts(produitAvecImages);
                }
                // Pour une seule entrée
                else if (response.produit && response.images_secondaires) {
                    setProducts([{
                        ...response.produit,
                        images_secondaires: response.images_secondaires
                    }]);
                }
                // Fallback au cas où
                else {
                    setProducts([]);
                    console.warn("Format de données inattendu:", response);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Header/>
            <Trier  
            nom ="Accessoires de Beauté" 
            />
            <hr  style={{width:"1100px", marginLeft:"400px" }}/>
            <div className="card-container" >
                  {products.map(creatCard)}
              </div>
            <Footer />
        </div>
    );
}

export default HuilePage;