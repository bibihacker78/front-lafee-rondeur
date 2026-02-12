import { useEffect, useState, useMemo } from "react";
import { formatPrice, getAllProducts, addproduit, updateProduit, deleteProduit, getAllCategories } from "../../api";

const AdminProduits = () => {
  const [produits, setProduits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [categorieId, setCategorieId] = useState(1);
  const [benefices, setBenefices] = useState("");
  const [conseilUtilisation, setConseilUtilisation] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagesSecondaires, setImagesSecondaires] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {

    getAllProducts()
      .then(data => setProduits(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getAllCategories()
      .then(data => setCategories(data))
      .catch(err => console.error('Erreur catégories', err));
  }, []);

  const categoriesMap = useMemo(() => {
    const m = {};
    (categories || []).forEach((c) => {
      // support possible different field name
      m[c.id ?? c.ID ?? c.IDCategorie] = c.nom ?? c.name ?? c.nom_categorie;
    });
    return m;
  }, [categories]);

  const handleModifyClick = (produit) => {
    setEditingId(produit.id);
    setNom(produit.nom);
    setPrix(produit.prix);
    setStock(produit.stock);
    setDescription(produit.description);
    setCategorieId(produit.categorie_id);
    setBenefices(produit.benefices || "");
    setConseilUtilisation(produit.conseil_utilisation || "");
    setIngredients(produit.ingredients || "");
    setImageFile(null);
    setImagesSecondaires([]);
    setShowForm(true);
  };

  return (
    <div>
      {/* TITRE */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Produits
        </h1>
        <p className="text-gray-500">
          Gérez vos articles, prix et stock
        </p>
      </div>

      {/* BOUTON AJOUT */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#ff008c] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#e6007e] transition"
        >
          + Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 rounded shadow-sm">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                if (editingId) {
                  // Mode édition
                  const updateData = {
                    nom, description, prix: Number(prix), stock: Number(stock),
                    categorie_id: categorieId, benefices, conseil_utilisation: conseilUtilisation, ingredients
                  };
                  await updateProduit(editingId, updateData);
                } else {
                  // Mode création
                  const form = new FormData();
                  form.append('nom', nom);
                  form.append('description', description);
                  form.append('prix', Number(prix));
                  form.append('stock', Number(stock));
                  form.append('categorie_id', categorieId);
                  form.append('benefices', benefices);
                  form.append('conseil_utilisation', conseilUtilisation);
                  form.append('ingredients', ingredients);
                  if (imageFile) form.append('image', imageFile);
                  if (imagesSecondaires && imagesSecondaires.length > 0) {
                    imagesSecondaires.forEach((file) => form.append('images_secondaires', file));
                  }
                  await addproduit(form);
                }
                const data = await getAllProducts();
                setProduits(data);
                // reset
                setNom(""); setDescription(""); setPrix(0); setStock(0);
                setBenefices(""); setConseilUtilisation(""); setIngredients("");
                setImageFile(null); setImagesSecondaires([]);
                setEditingId(null);
                setShowForm(false);
              } catch (err) {
                console.error(err);
                alert(err.message || 'Erreur');
              } finally {
                setLoading(false);
              }
            }}
            className="grid grid-cols-1 gap-3"
          >
            <input
              required
              placeholder="Nom du produit"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              required
              type="number"
              placeholder="Prix"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              required
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <label className="text-sm text-gray-600">Catégorie</label>
            <select
              required
              value={categorieId}
              onChange={(e) => setCategorieId(Number(e.target.value))}
              className="border px-3 py-2 rounded"
            >
              {(categories || []).map((c) => (
                <option key={c.id} value={c.id}>{c.nom}</option>
              ))}
            </select>
            <input
              placeholder="Bénéfices (séparés par des virgules)"
              value={benefices}
              onChange={(e) => setBenefices(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Conseil d'utilisation"
              value={conseilUtilisation}
              onChange={(e) => setConseilUtilisation(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Ingrédients (séparés par des virgules)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <label className="text-sm text-gray-600">Image principale</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border px-3 py-2 rounded"
            />
            <label className="text-sm text-gray-600">Images secondaires (plusieurs)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImagesSecondaires(Array.from(e.target.files))}
              className="border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border px-3 py-2 rounded"
            />

            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded border">
                Annuler
              </button>
              <button type="submit" disabled={loading} className="bg-[#ff008c] text-white px-4 py-2 rounded">
                {loading ? 'Envoi...' : (editingId ? 'Mettre à jour' : 'Ajouter')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-pink-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4">Produit</th>
              <th className="text-left px-6 py-4">Prix</th>
              <th className="text-left px-6 py-4">Catégorie</th>
              <th className="text-left px-6 py-4">Stock</th>
              <th className="text-left px-6 py-4">Statut</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {produits.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-[#fff5fa] transition"
              >
                {/* PRODUIT */}
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={`http://localhost:3000/${p.image_principale}`}
                    alt={p.nom}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                  <span className="font-medium text-gray-800">
                    {p.nom}
                  </span>
                </td>

                {/* PRIX */}
                <td className="px-6 py-4">
                  {formatPrice(p.prix)}
                </td>

                {/* CATEGORIE */}
                <td className="px-6 py-4">
                  {categoriesMap[p.categorie_id] ?? p.categorie_id ?? '—'}
                </td>

                {/* STOCK */}
                <td className="px-6 py-4">
                  {p.stock ?? "—"}
                </td>

                {/* STATUT */}
                <td className="px-6 py-4">
                  {p.stock > 0 ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      En stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                      Rupture
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleModifyClick(p)} className="text-[#ff008c] hover:underline">
                      Modifier
                    </button>
                    <button
                      onClick={async () => {
                        const ok = window.confirm(`Supprimer "${p.nom}" ?`);
                        if (!ok) return;
                        try {
                          setDeletingId(p.id);
                          await deleteProduit(p.id);
                          const data = await getAllProducts();
                          setProduits(data);
                        } catch (err) {
                          console.error(err);
                          alert(err.message || 'Erreur suppression');
                        } finally {
                          setDeletingId(null);
                        }
                      }}
                      disabled={deletingId === p.id}
                      className="text-red-500 hover:underline disabled:opacity-50"
                    >
                      {deletingId === p.id ? 'Suppression...' : 'Supprimer'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {produits.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400"
                >
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduits;
