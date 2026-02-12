import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  getUserCart,
  deleteFromCart,
  clearCart,
  updateCart,
  getUser
} from '../api';
import { formatPrice } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PanierPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // ---- GENERATE IMAGE URL ----
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/public/assets/placeholder-image.png';
    return `http://localhost:3000/${imagePath}`;
  };

  // ---- LOAD USER CART ----
  const loadCart = async () => {
    try {
      setIsLoading(true);

      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setIsLoading(false);
        return;
      }

      const user = JSON.parse(userStr);
      if (!user.id) {
        setIsLoading(false);
        return;
      }

      const cartData = await getUserCart(user.id);

      if (Array.isArray(cartData)) {
        setCartItems(cartData);
        const total = cartData.reduce((sum, item) => sum + item.prix * item.quantite, 0);
        setTotalPrice(total);
      }

      setIsLoading(false);

    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
      setIsLoading(false);
    }
  };

  // ---- LOAD USER DATA ----
  const loadUser = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      if (!user.id) return;

      const userData = await getUser(user.id);
      setUser(userData);

    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
    }
  };

  // ---- DELETE ITEM ----
  const handleDelete = async (id) => {
    try {
      await deleteFromCart(id);
      setCartItems(prev => prev.filter(item => item.id !== id));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Article supprimé du panier");
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  // ---- UPDATE QUANTITY ----
  const handleUpdate = async (produit_id, quantite) => {
    try {
      if (quantite <= 0) {
        if (window.confirm("Supprimer cet article ?")) {
          await handleDelete(produit_id);
        }
        return;
      }

      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      if (!user.id) return;

      await updateCart(user.id, produit_id, quantite);
      await loadCart();
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
      console.error("Erreur update:", error);
    }
  };

  // ---- QUANTITY +1 ----
  const handleIncrement = (id, qty) => {
    handleUpdate(id, parseInt(qty) + 1);
  };

  // ---- QUANTITY -1 ----
  const handleDecrement = (id, qty) => {
    if (qty > 1) {
      handleUpdate(id, qty - 1);
    } else {
      if (window.confirm("Supprimer cet article ?")) {
        handleDelete(id);
      }
    }
  };

  // ---- CLEAR CART ----
  const handleClearCart = async () => {
    try {
      if (!window.confirm("Voulez-vous vider votre panier ?")) return;

      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      if (!user.id) return;

      await clearCart(user.id);
      await loadCart();
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
      console.error("Erreur vider panier:", error);
    }
  };

  // ---- CHECKOUT ----
  const handleCheckout = () => {
    if (!user) {
      alert("Veuillez vous connecter pour continuer");
      navigate("/login");
      return;
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("totalPrice", totalPrice);

    navigate("/checkout");
  };

  // ---- AUTH + LOAD ----
  useEffect(() => {
    const checkAuth = () => {
      const u = localStorage.getItem("user");
      const t = localStorage.getItem("token");

      if (!u || !t) {
        navigate("/login");
        return false;
      }
      return true;
    };

    const isAuth = checkAuth();

    if (isAuth) {
      loadUser();
      loadCart();
    }
  }, [navigate]);


  return (
    <div className="relative">
      <Header />

      {/* Halos décoratifs premium */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200/40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300/30 blur-3xl rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto py-16 px-4">

        <h1 className="text-3xl text-center font-bold text-gray-800 mb-10">
          Mon Panier
        </h1>

        {/* LOADING */}
        {isLoading && (
          <p className="text-center text-gray-500 text-lg">Chargement du panier...</p>
        )}

        {/* PANIER VIDE */}
        {!isLoading && cartItems.length === 0 && (
          <div className="bg-white/60 backdrop-blur-md border border-pink-100 shadow-md rounded-2xl p-10 flex flex-col items-center">
            <img src="/public/assets/shopping-bag.png" className="w-32 opacity-60 mb-6" />

            <p className="text-gray-600 text-lg mb-6">
              Votre panier est vide.
            </p>

            <button
              onClick={() => navigate("/produits")}
              className="px-6 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-md transition"
            >
              Continuer mes achats
            </button>
          </div>
        )}

        {/* PANIER REMPLI */}
        {!isLoading && cartItems.length > 0 && (
          <div className="bg-white shadow-xl rounded-2xl border border-pink-100 overflow-hidden">

            {/* ACTIONS */}
            <div className="flex justify-end p-5 border-b border-gray-100">
              <button
                onClick={handleClearCart}
                className="text-pink-600 font-semibold hover:text-white hover:bg-pink-600 border border-pink-400 px-4 py-2 rounded-lg transition"
              >
                Vider le panier
              </button>
            </div>

            {/* ITEMS */}
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-5 border-b border-gray-100 relative">

                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 text-xl"
                  onClick={() => handleDelete(item.id)}
                >
                  ✕
                </button>

                <img
                  src={getImageUrl(item.image_principale)}
                  className="w-28 h-28 object-cover rounded-xl shadow-sm"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.nom}</h3>
                  <p className="text-gray-500">Prix unitaire : {formatPrice(item.prix)}</p>
                </div>

                {/* QUANTITE */}
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                    onClick={() => handleDecrement(item.produit_id, item.quantite)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    className="w-14 text-center border border-gray-300 rounded-lg"
                    value={item.quantite}
                    min="1"
                    onChange={(e) => handleUpdate(item.produit_id, e.target.value)}
                  />

                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                    onClick={() => handleIncrement(item.produit_id, item.quantite)}
                  >
                    +
                  </button>
                </div>

                <div className="text-lg font-bold text-gray-800">
                  {formatPrice(item.prix * item.quantite)}
                </div>
              </div>
            ))}

            {/* SUMMARY */}
            <div className="p-8 bg-pink-50 border-t border-gray-200">
              <div className="max-w-sm ml-auto space-y-3">

                <div className="flex justify-between text-gray-700">
                  <span>Sous-total :</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Livraison :</span>
                  <span>{formatPrice(totalPrice > 50 ? 0 : 5.99)}</span>
                </div>

                <div className="flex justify-between text-gray-900 font-bold text-xl border-t pt-4">
                  <span>Total :</span>
                  <span>{formatPrice(totalPrice > 50 ? totalPrice : totalPrice + 5.99)}</span>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">

                  <button
                    onClick={() => navigate("/produits")}
                    className="flex-1 py-3 rounded-lg border border-gray-400 text-gray-700 font-semibold hover:bg-gray-200 transition"
                  >
                    Continuer mes achats
                  </button>

                  <button
                    onClick={handleCheckout}
                    disabled={!user}
                    className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
                      user ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Passer à la caisse
                  </button>

                </div>

              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default PanierPage;
