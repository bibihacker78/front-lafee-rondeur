import { useEffect, useState } from "react";
import { getAdminClients } from "../../api";

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminClients()
      .then(setClients)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        👥 Clients
      </h1>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-pink-100 text-pink-700">
              <tr>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3">Rôle</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Créé le</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-pink-50">
                  <td className="px-4 py-3 font-medium">{c.nom}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        c.role === "admin"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {c.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.telephone || "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
