import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import conseilData from "../../conseilData";

const Conseil = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="relative min-h-screen bg-white px-4 lg:px-10 py-16">

        {/* Halos décoratifs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200/30 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/20 blur-3xl rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* SECTION ARTICLES */}
          <div className="lg:col-span-2 space-y-10">

            <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">
              Conseils & Astuces Beauté
            </h1>

            <div className="grid sm:grid-cols-2 gap-8">

              {conseilData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/article/${item.id}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 group"
                >
                  {/* IMAGE */}
                  <div className="relative w-full h-56 overflow-hidden rounded-lg">
                    <img
                      src={item.img}
                      alt={item.titre}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    {/* DATE BADGE */}
                    <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                      {item.date}
                    </span>
                  </div>

                  {/* TEXTE */}
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
                      {item.titre}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {item.info}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* SIDEBAR FAQ */}
          <aside className="bg-white shadow-lg rounded-xl p-6 h-max border border-pink-200/40 lg:sticky lg:top-28">

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ❓ FAQ – Questions fréquentes
            </h3>

            <ul className="space-y-5">

              <li className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-800">
                  📌 En combien de temps verrai-je les résultats ?
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Les premiers résultats apparaissent après 3 à 6 semaines d’utilisation régulière.
                </p>
              </li>

              <li className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-800">
                  📌 Puis-je utiliser plusieurs produits ensemble ?
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Oui, mais il est conseillé d’observer les effets avant de combiner plusieurs soins.
                </p>
              </li>

              <li className="pb-2">
                <h4 className="font-semibold text-gray-800">
                  📌 Y a-t-il des contre-indications ?
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Tous nos produits sont naturels, mais en cas de grossesse ou allergies,
                  demandez l’avis d’un professionnel.
                </p>
              </li>

            </ul>

          </aside>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Conseil;
