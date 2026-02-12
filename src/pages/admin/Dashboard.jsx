import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { getAdminStats } from "../../api";
import { formatPrice } from "../../api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getAdminStats();
        if (mounted) setStats(data);
      } catch (err) {
        console.error('Erreur récupération stats admin:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const card = (label, value, icon) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 flex items-center gap-4 hover:shadow-md transition">
      <div className="w-12 h-12 rounded-full bg-[#ff008c]/10 text-[#ff008c] flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fffafc]">
      <div className="max-w-[1300px] mx-auto px-4 py-10">
        {/* TITRE */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bienvenue dans votre espace de gestion ✨</p>
        </div>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 h-28 animate-pulse" />
            ))
          ) : (
            <>
              {card('Produits', stats?.produits ?? '—', <FaBoxOpen />)}
              {card('Commandes', stats?.commandes ?? '—', <FaShoppingBag />)}
              {card('Clients', stats?.utilisateurs ?? '—', <FaUsers />)}
              {card('Chiffre d’affaires', stats?.chiffreAffaires ? formatPrice(stats.chiffreAffaires) : '—', <FaChartLine />)}
            </>
          )}
        </section>

        {/* SECTIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dernières commandes */}
          <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Dernières commandes</h2>

            <ul className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <li key={i} className="flex justify-between items-center border-b pb-3 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-700">Commande #{1023 + i}</p>
                    <p className="text-sm text-gray-500">Cliente — Abidjan</p>
                  </div>
                  <span className="text-[#ff008c] font-semibold">45 000 FCFA</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alertes stock */}
          <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Alertes stock</h2>

            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-600">Crème Raffermissante</span>
                <span className="text-red-500 font-semibold">Stock faible</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Huile Naturelle</span>
                <span className="text-yellow-500 font-semibold">Bientôt épuisé</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
