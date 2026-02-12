import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import conseilData from "../../conseilData";

const ArticlePage = () => {


  const { id } = useParams();
  const article = conseilData.find((item) => item.id === (id));

  if (!article) {
    return <p>Article non trouvé</p>;
  }

  return (
    <div>
      <Header />

      <div className="article-container">
        {/* Contenu principal */}
        <div className="article-content">
          <h1>{article.titre}</h1>
          <img src={article.img} alt="Article" />
          <p>Astuces pour obtenir de meilleurs résultats avec nos produits <br />
             Régularité : Appliquez les produits tous les jours, matin et soir, pour une efficacité optimale. <br />             Massage Circulaire : Massez la zone cible en mouvements circulaires pendant 5 à 10 minutes pour favoriser l’absorption. <br />             Hydratation : Boire beaucoup d’eau permet d’améliorer l’élasticité de la peau et d’optimiser les effets des huiles et crèmes. <br />             Alimentation Équilibrée : Une alimentation riche en protéines et en bonnes graisses peut aider à développer les courbes naturelles. <br />             Exercice Ciblé : Associez l’application des produits à des exercices adaptés (ex : squats, ponts, relevés de hanches pour les fesses).</p>
<hr />
             <div className="avis-content">
                <form action="post" className="form-avis">
                  <h4>Laissez un commentaire </h4>
                  <h6>Votre commentaire: </h6>
                     <textarea name="avis" id="avis" cols="50" rows="7"></textarea>
                  <div className="form-group">
                       <p className="form-nom">
                      <input type="text" placeholder=" Nom" />
                     </p>
                         <p className="form-email">
                       <input type="text" placeholder=" Adresse e-mail"  />
                     </p>
                 </div>

              <button type="submit">SOUMETTRE L'AVIS</button>
            </form>


          </div>
        </div>

        {/* Section latérale pour l’historique */}
        <div className="article-sidebar">
          <h3>Derniers articles</h3>
          <ul>
            {conseilData.slice(0, 3).map((item) => (
              <li key={item.id}>
                <a href={`/article/${item.id}`}>{item.titre}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
     

      <Footer />
    </div>
  );
};

export default ArticlePage;
