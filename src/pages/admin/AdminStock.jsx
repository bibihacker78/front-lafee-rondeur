import { useEffect, useState } from "react";

const AdminStock = () => {
  const [produits, setProduits] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/produits")
      .then(res => res.json())
      .then(data => setProduits(data))
      .catch(err => console.error(err));
  }, []);

  const handleStockChange = (id, value) => {
    setProduits(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: value } : p
      )
    );
  };

  const saveStock = async (produit) => {
    try {
      setLoadingId(produit.id);

      await fetch(
        `http://localhost:3000/api/admin/produits/${produit.id}/stock`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock: produit.stock }),
        }
      );

      alert("Stock mis à jour ✔️");
    } catch (e) {
      alert("Erreur lors de la mise à jour");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {/* TITRE */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Gestion du stock 📦
        </h1>
        <p className="text-gray-500">
          Modifiez les quantités disponibles
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-pink-50">
            <tr>
              <th className="text-left px-6 py-4">Produit</th>
              <th className="text-center px-6 py-4">Quantité</th>
              <th className="text-right px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {produits.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-[#fff5fa]"
              >
                {/* NOM */}
                <td className="px-6 py-4 font-medium">
                  {p.nom}
                </td>

                {/* INPUT STOCK */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    value={p.stock ?? 0}
                    onChange={(e) =>
                      handleStockChange(
                        p.id,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 text-center border border-pink-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </td>

                {/* BOUTON */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => saveStock(p)}
                    disabled={loadingId === p.id}
                    className="px-4 py-2 rounded-lg text-sm font-semibold
                      bg-[#ff008c] text-white
                      hover:bg-[#e6007f]
                      disabled:opacity-50"
                  >
                    {loadingId === p.id
                      ? "Enregistrement..."
                      : "Enregistrer"}
                  </button>
                </td>
              </tr>
            ))}

            {produits.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-10 text-gray-400"
                >
                  Aucun produit
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStock;
