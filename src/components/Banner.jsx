import React from 'react';
import './banner.css'; // Nous allons créer ce fichier CSS ensuite

const Banner = () => {
  // Images de bannière avec leurs liens et titres
  const bannerImages = [
    {
      id: 1,
      image: '../assets/3.png',
      title: 'Collection Femme',
      link: '/collection/femme'
    },
    {
      id: 2,
      image: '/home/bintou/la-fee-rondeur-app/public/assets/Carousel3.jpg',
      title: 'Collection Homme',
      link: '/collection/homme'
    },
    {
      id: 3,
      image: '/images/banner3.jpg',
      title: 'Accessoires',
      link: '/accessoires'
    },
    {
      id: 4,
      image: '/images/banner4.jpg',
      title: 'Nouveautés',
      link: '/nouveautes'
    }
  ];

  return (
    <div className="banner-section">
      <div className="container">
        <div className="banner-grid-wrapper">
          {bannerImages.map((item) => (
            <div key={item.id} className="banner-item">
              <a href={item.link} className="banner-link">
                <div className="banner-image-container">
                  <img src={item.image} alt={item.title} className="banner-image" />
                  <div className="banner-overlay">
                    <h3 className="banner-title">{item.title}</h3>
                    <span className="banner-btn">Découvrir</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;