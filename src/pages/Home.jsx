import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Separateur from "../components/Separateur";
import Card from "../components/Card";
import Banner from "../components/Banner";
import Temoignage from "../components/Temoignage";
import Footer from "../components/Footer";
import Section from "../components/Section";

function Home() {
  const cardContainerRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [navOpen]);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/produits");
        const data = await response.json();
        setProduits(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  return (
    <div className="relative overflow-hidden">


      {/* shape rose en haut */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#ff008c20] rounded-full blur-3xl"></div>

      {/* shape rose en bas */}
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-[#ff008c15] rounded-full blur-3xl"></div>

      <Header navOpen={navOpen} toggleNav={toggleNav} />
      <Carousel />
      {/* Silhouette rose */}
      {/* Section produit avec silhouette à l'extrême gauche */}
      <div className="relative w-full">
        <img
          src="/assets/silhouette3.png"
          alt="silhouette"
          className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 w-[300px] md:w-[400px] lg:w-[500px] pointer-events-none select-none"
        />
        <Separateur titre="Nouveautés" />
        <Section produits={produits.slice(0, 5)} /> {/* Les 5 premiers produits */}

        <Separateur titre="Apoutchou"/>

        <Section produits={produits.slice(0, 5)} /> {/* Les 5 premiers produits */}

      </div>

      <Separateur titre="Témoignages" />
      <div className="relative w-full my-20">
        <img
          src="/assets/silhouette2.png"
          alt="silhouette"
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 w-[300px] md:w-[400px] lg:w-[500px] pointer-events-none select-none"
        />

        <Temoignage />

      </div>
      <Footer />
    </div>
  );
}

export default Home;