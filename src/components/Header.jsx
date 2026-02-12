import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/public/assets/logo.jpg";
import { getUserCart, getAllProducts, formatPrice } from "../api";

function Header({ navOpen, toggleNav }) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [activeTab, setActiveTab] = useState("");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

  // Charger produits
  useEffect(() => {
    getAllProducts().then(setAllProducts).catch(() => setAllProducts([]));
  }, []);

  // Suggestions recherche
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      allProducts.filter((p) =>
        p.nom.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 10)
    );
  }, [search, allProducts]);

  // Sticky header
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // User + Panier
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u && u !== "undefined") {
      const parsed = JSON.parse(u);
      setUser(parsed);
      loadCart(parsed.id);
    }
  }, []);

  const loadCart = async (userId) => {
    const data = await getUserCart(userId);
    if (Array.isArray(data)) {
      setCartItems(data);
      setCartCount(data.reduce((sum, i) => sum + i.quantite, 0));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/recherche?q=${encodeURIComponent(search)}`);
    setSearch("");
    setSuggestions([]);
  };

  // Fermer suggestions si clic hors
  useEffect(() => {
    const handleOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const navItems = [
    { href: "/sirop", label: "SIROP" },
    { href: "/creme", label: "CRÈME" },
    { href: "/huile", label: "HUILE" },
    { href: "/the", label: "THÉ/DÉTOX" },
    { href: "/accessoires", label: "ACCESSOIRES" },
    { href: "/conseil", label: "CONSEIL" },
    { href: "/apropos", label: "À PROPOS" },
  ];

  // Met à jour l'onglet actif en fonction de l'URL courante
  useEffect(() => {
    const path = location.pathname;
    // Cherche l'item dont le href est un préfixe du path (gère les sous-routes)
    const match = navItems.find(
      (item) => path === item.href || path.startsWith(item.href + "/")
    );
    setActiveTab(match ? match.href : "");
  }, [location.pathname]);

  return (
    <header
      className={`w-full bg-white transition-all duration-300 z-50 
      ${isSticky ? "fixed top-0 left-0 shadow-[0_2px_10px_#ff008c22]" : ""}`}
    >
      {/* Bandeau promo pastel */}
      {!isSticky && (
        <div className="w-full text-center bg-[#ff008c15] text-[#cc317e] font-medium py-2 text-sm tracking-wide">
          Promotion jusqu'au 20 Janvier ✨
        </div>
      )}

      {/* Ligne principale */}
      <div className="flex justify-between items-center px-5 md:px-12 py-4 gap-6">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-14 md:h-16 object-contain cursor-pointer" />
        </Link>

        {/* Recherche */}
        <div className="hidden md:flex flex-col relative w-1/2" ref={searchRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-[#ff008c33] rounded-full px-4 py-2 shadow-sm 
                       focus-within:ring-2 focus-within:ring-[#ff008c77]"
          >
            <input
              type="search"
              placeholder="Rechercher un produit"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
            <button className="text-[#cc317e]">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg border mt-2 z-50 max-h-72 overflow-auto">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 p-3 hover:bg-[#ff008c11] cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.image_principale && (
                    <img
                      src={`http://localhost:3000/${product.image_principale}`}
                      className="w-10 h-10 rounded object-cover border"
                    />
                  )}
                  <span className="text-sm">{product.nom}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Icônes droite */}
        <div className="hidden md:flex items-center gap-8 text-gray-700">

          {/* User */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 hover:text-[#ff008c] transition">
              <Link
                to={user ? "/" : "/connexion"}
                className={activeTab === "/connexion" ? "active-link" : ""}
              >
                <i className="fa-solid fa-user text-xl text-[#ff008c]"></i>
                <span>{user ? `Hello, ${user.nom}` : "Connexion"}</span>
              </Link>
            </div>

            {user ? (
              <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44 border hidden group-hover:block z-50">
                <li className="px-4 py-2 hover:bg-[#ff008c11]"><Link to="/account">Mon compte</Link></li>
                <li className="px-4 py-2 hover:bg-[#ff008c11]">Mes commandes</li>
                <li className="px-4 py-2 hover:bg-[#ff008c11]">Paramètres</li>
                <li className="px-4 py-2 hover:bg-[#ff008c11]" onClick={handleLogout}>Déconnexion</li>
              </ul>
            ) : null}
          </div>

          {/* Panier */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 hover:text-[#ff008c] transition">
              <i className="fa-solid fa-cart-shopping text-xl text-[#ff008c]"></i>
              <span>Panier {cartCount > 0 && <b>({cartCount})</b>}</span>
            </div>

            {/* Dropdown panier */}
            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 max-h-80 overflow-auto border hidden group-hover:block z-50">
              {cartItems.length === 0 ? (
                <li className="text-center py-6 text-gray-500">Panier vide</li>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 p-3 border-b">
                      <img
                        src={`http://localhost:3000/${item.image_principale}`}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="text-sm">
                        <p>{item.nom}</p>
                        <p className="text-gray-500">Qté : {item.quantite}</p>
                        <p className="font-semibold">{formatPrice(item.prix)}</p>
                      </div>
                    </li>
                  ))}
                  <li className="p-3 text-center">
                    <Link to="/panier" className="text-[#ff008c] font-medium">Voir le panier</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-3xl text-[#ff008c]"
          onClick={toggleNav}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Navigation bas (desktop) */}
      {!isSticky && (
        <nav className="w-full bg-white border-t border-[#ff008c22] shadow-sm">
          <ul className="flex justify-center gap-6 py-3 text-sm font-medium">
            {navItems.map((item) => (
              <li className="relative" key={item.href}>
                <Link
                  to={item.href}
                  className={`px-1 ${activeTab === item.href
                      ? "text-[#ff008c]"
                      : "text-gray-700 hover:text-[#ff008c]"
                    }`}
                >
                  {item.label}
                </Link>
                <div
                  className={`absolute left-0 bottom-0 h-[2px] bg-[#ff008c] transition-all 
                  ${activeTab === item.href ? "w-full" : "w-0"}`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
