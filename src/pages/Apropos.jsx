import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "/apropos.css"

const Apropos = () => {
    return (
        <div>
            <Header />
            <div className="apropos-container">

            <div className="apropos">

                <div className="blacked">
                    <h2>UNE FORME PARFAITE</h2>
                    <p>Faites nous confiance pour etre bien dans votre peauWe formulate products that promote healthy skin  <br /> and protect your skin barrier. 
                       We are passionate about developing healthy, sustainable instant-result products.</p>
                    </div>
                <div className="apropos-img">
                <img src="./assets/Carousel3.jpg" alt="" />
                </div>
            </div>
            <div className="apropos-item">
                <div className="apropos-item-text">
                <h2>Nos services</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus aliquam placeat ab. Neque magnam maxime deleniti distinctio quaerat suscipit molestiae tenetur modi obcaecati! 
                Distinctio animi deleniti impedit magni natus reiciendis?</p>
                </div>
                <img src="./assets/876A7513.jpg" alt="" />

            </div>
            <div className="apropos-item">
                <img src="./assets/dessin-silhouette.jpg" alt="" />
                <div className="apropos-item-text">
                <h2>Qualité assuré</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus aliquam placeat ab. Neque magnam maxime deleniti distinctio quaerat suscipit molestiae tenetur modi obcaecati! 
                Distinctio animi deleniti impedit magni natus reiciendis?</p>
                </div>

            </div>
            </div>
            <Footer />

        </div>
    )
};

export default Apropos; 