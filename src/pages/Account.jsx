import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { updateUser, getUser } from "../api";

const Account = () => {
  const [activeSection, setActiveSection] = useState("mon-compte");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <Header />

      <div className="relative bg-white min-h-screen py-16 px-4 lg:px-10">
        
        {/* Halos décoratifs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-200/40 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300/30 blur-3xl rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* SIDEBAR */}
          <aside className="bg-white shadow-xl border border-pink-100 rounded-2xl p-6 h-max sticky top-28">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bonjour, <span className="text-pink-600">{user?.nom}</span>
            </h2>

            <ul className="space-y-3">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                    activeSection === "mon-compte"
                      ? "bg-pink-500 text-white"
                      : "hover:bg-pink-100 text-gray-700"
                  }`}
                  onClick={() => setActiveSection("mon-compte")}
                >
                  Mon compte
                </button>
              </li>

              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                    activeSection === "commandes"
                      ? "bg-pink-500 text-white"
                      : "hover:bg-pink-100 text-gray-700"
                  }`}
                  onClick={() => setActiveSection("commandes")}
                >
                  Mes commandes
                </button>
              </li>

              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                    activeSection === "adresse"
                      ? "bg-pink-500 text-white"
                      : "hover:bg-pink-100 text-gray-700"
                  }`}
                  onClick={() => setActiveSection("adresse")}
                >
                  Adresse
                </button>
              </li>

              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                    activeSection === "parametres"
                      ? "bg-pink-500 text-white"
                      : "hover:bg-pink-100 text-gray-700"
                  }`}
                  onClick={() => setActiveSection("parametres")}
                >
                  Paramètres
                </button>
              </li>

              <li>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium text-red-500 hover:bg-red-50"
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </aside>

          {/* CONTENU PRINCIPAL */}
          <main className="lg:col-span-3 bg-white shadow-lg border border-pink-100 rounded-2xl p-8">

            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeSection === "mon-compte" && "Mon Compte"}
              {activeSection === "commandes" && "Mes Commandes"}
              {activeSection === "adresse" && "Modifier mon adresse"}
              {activeSection === "parametres" && "Paramètres"}
            </h1>

            {/* SECTION : MON COMPTE */}
            {activeSection === "mon-compte" && (
              <div className="space-y-8">

                {/* Infos perso */}
                <div className="border rounded-xl p-6 shadow-sm bg-pink-50/40">
                  <h2 className="font-semibold text-gray-800 mb-4">
                    Mes informations personnelles
                  </h2>
                  <p className="text-gray-700">
                    Nom : {user?.nom || "-"} <br />
                    Email : {user?.email || "-"} <br />
                    Téléphone : {user?.telephone || "-"}
                  </p>
                </div>

                {/* Adresse */}
                <div className="border rounded-xl p-6 shadow-sm bg-pink-50/40">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-gray-800">
                      Adresse
                    </h2>
                    <button
                      onClick={() => setActiveSection("adresse")}
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </div>
                  <p className="text-gray-700">
                    {user?.adresse || "-"} <br />
                    {user?.commune || ""} {user?.ville || ""}<br />
                    {user?.pays || ""}
                  </p>
                </div>
              </div>
            )}

            {/* SECTION : COMMANDES */}
            {activeSection === "commandes" && (
              <p className="text-gray-600">Aucune commande trouvée.</p>
            )}

            {/* SECTION : ADRESSE */}
            {activeSection === "adresse" && (
              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;

                  const data = {
                    adresse: form.adresse.value,
                    commune: form.commune.value,
                    ville: form.ville.value,
                    pays: form.pays.value,
                    code_postal: form.code_postal.value,
                    prefixe: form.prefixe.value,
                    telephone: form.telephone.value,
                    info_supplementaire: form.info_supplementaire.value,
                  };

                  await updateUser(user.id, data);
                  const updated = await getUser(user.id);
                  setUser(updated);
                  localStorage.setItem("user", JSON.stringify(updated));

                  alert("Adresse mise à jour !");
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Champs */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      name="adresse"
                      defaultValue={user?.adresse}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Commune</label>
                    <input
                      type="text"
                      name="commune"
                      defaultValue={user?.commune}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Ville</label>
                    <input type="text" name="ville" defaultValue={user?.ville} className="input" />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Pays</label>
                    <input type="text" name="pays" defaultValue={user?.pays} className="input" />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Code postal</label>
                    <input type="number" name="code_postal" defaultValue={user?.code_postal} className="input" />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Contact</label>
                    <div className="flex gap-3">
                      <select name="prefixe" className="input w-24" defaultValue={user?.prefixe}>
                        <option value="+225">+225</option>
                        <option value="+221">+221</option>
                        <option value="+33">+33</option>
                      </select>
                      <input
                        type="tel"
                        name="telephone"
                        defaultValue={user?.telephone}
                        className="input flex-1"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block font-medium text-gray-700 mb-1">
                      Informations supplémentaires
                    </label>
                    <input
                      type="text"
                      name="info_supplementaire"
                      defaultValue={user?.info_supplementaire}
                      className="input"
                    />
                  </div>
                </div>

                <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold">
                  Enregistrer
                </button>
              </form>
            )}

            {/* SECTION : PARAMETRES */}
            {activeSection === "parametres" && (
              <p className="text-gray-600">Paramètres du compte à venir.</p>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
