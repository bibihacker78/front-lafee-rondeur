import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    try {
      const data = await registerUser(nom, email, motDePasse);

      if (data.token) {
        localStorage.setItem("token", data.token);

        // Stocke l'utilisateur si renvoyé
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify({ nom, email, id: data.id || null })
          );
        }

        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        setErreur(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setErreur("Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-12 relative">

        {/* Halos décoratifs rose */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-pink-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>

        {/* Carte centrale */}
        <div className="relative w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-pink-200/50 backdrop-blur">

          <h1 className="text-center text-3xl font-bold text-pink-600 mb-6 tracking-wide">
            Inscription
          </h1>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Nom */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Nom
              </label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-pink-200 bg-white
                focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-pink-200 bg-white
                focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Mot de passe
              </label>
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-pink-200 bg-white
                focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition"
              />
            </div>

            {/* Message d'erreur */}
            {erreur && (
              <p className="text-center text-red-500 text-sm font-medium">
                {erreur}
              </p>
            )}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300
              text-white font-semibold rounded-lg shadow-md transition"
            >
              {loading ? "Création du compte..." : "S'inscrire"}
            </button>
          </form>

          {/* Ligne vers connexion */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link
              to="/connexion"
              className="text-pink-600 font-semibold hover:underline"
            >
              Connexion
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Inscription;
