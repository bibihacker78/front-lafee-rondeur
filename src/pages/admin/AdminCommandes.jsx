import { useEffect, useState } from "react";
import { formatPrice } from "../../api";

const statusColors = {
  en_attente: "bg-yellow-100 text-yellow-700",
  payee: "bg-blue-100 text-blue-700",
  livree: "bg-green-100 text-green-700",
  annulee: "bg-red-100 text-red-600",
};

const statusLabels = {
  en_attente: "En attente",
  payee: "Payée",
  livree: "Livrée",
  annulee: "Annulée",
};

const AdminCommandes = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    // 🔁 À remplacer par ton endpoint admin commandes
    fetch("http://localhost:3000/api/commandes")
      .then(res => res.json())
      .then(data => setCommandes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* TITRE */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Commandes 📦
        </h1>
        <p className="text-gray-500">
          Suivi des ventes et livraisons
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-pink-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4">Commande</th>
              <th className="text-left px-6 py-4">Client</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Total</th>
              <th className="text-left px-6 py-4">Statut</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {commandes.map((cmd) => (
              <tr
                key={cmd.id}
                className="border-t hover:bg-[#fff5fa] transition"
              >
                {/* ID */}
                <td className="px-6 py-4 font-medium">
                  #{cmd.reference || cmd.id}
                </td>

                {/* CLIENT */}
                <td className="px-6 py-4">
                  {cmd.client_nom || "Client"}
                </td>

                {/* DATE */}
                <td className="px-6 py-4 text-gray-500">
                  {new Date(cmd.created_at).toLocaleDateString()}
                </td>

                {/* TOTAL */}
                <td className="px-6 py-4 font-semibold">
                  {formatPrice(cmd.total)}
                </td>

                {/* STATUT */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[cmd.statut] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {statusLabels[cmd.statut] || "Inconnu"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-right">
                  <button className="text-[#ff008c] hover:underline">
                    Voir
                  </button>
                </td>
              </tr>
            ))}

            {commandes.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400"
                >
                  Aucune commande enregistrée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCommandes;
