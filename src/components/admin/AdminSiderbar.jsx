import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaChartPie />, path: "/admin/dashboard" },
  { label: "Produits", icon: <FaBox />, path: "/admin/produits" },
  { label: "Commandes", icon: <FaShoppingCart />, path: "/admin/commandes" },
  { label: "Clients", icon: <FaUsers />, path: "/admin/clients" },
  { label: "Paramètres", icon: <FaCogs />, path: "/admin/parametres" },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-pink-100 min-h-screen px-4 py-6">
      {/* LOGO */}
      <div className="mb-10 text-center">
        <h2 className="text-xl font-semibold text-[#ff008c]">
          La Fée Admin ✨
        </h2>
        <p className="text-sm text-gray-400">
          Gestion boutique
        </p>
      </div>

      {/* MENU */}
      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
              ${
                isActive
                  ? "bg-[#ff008c]/10 text-[#ff008c]"
                  : "text-gray-600 hover:bg-pink-50 hover:text-[#ff008c]"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="mt-10 pt-6 border-t border-pink-100">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="flex items-center gap-3 text-gray-500 hover:text-red-500 px-4 py-3 w-full"
        >
          <FaSignOutAlt />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
