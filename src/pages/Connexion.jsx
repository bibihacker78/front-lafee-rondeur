import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    try {
      const data = await loginUser(email, motDePasse);

      if (data && data.token) {
        localStorage.setItem("token", data.token);

        let userData = data.user
          ? data.user
          : { id: data.id, nom: data.nom, email };

        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));

        navigate("/");
      } else {
        setErreur("Identifiants incorrects");
      }
    } catch (error) {
      setErreur("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-12 relative">
        {/* Déco rose pastel */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-pink-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-pink-200/50 backdrop-blur">
          <h1 className="text-center text-3xl font-bold text-pink-600 mb-6 tracking-wide">
            Connexion
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
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

            {/* Erreur */}
            {erreur && (
              <div className="text-red-500 text-sm text-center font-medium">
                {erreur}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 
              text-white font-semibold rounded-lg shadow-md transition-all"
            >
              {loading ? "Connexion..." : "Connexion"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link
              to="/inscription"
              className="text-pink-600 font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Connexion;
