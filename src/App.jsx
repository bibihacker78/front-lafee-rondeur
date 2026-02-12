import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* 🌍 Pages publiques */
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Conseil from "./pages/Conseil";
import Apropos from "./pages/Apropos";
import ArticlePage from "./pages/ArticlePage";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import PanierPage from "./pages/PanierPage";
import Account from "./pages/Account";
import CategoriePage from "./pages/CategoriePage";

/* 🔐 Admin */
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStock from "./pages/admin/AdminStock";
import AdminProduits from "./pages/admin/AdminProduits";
import AdminCommandes from "./pages/admin/AdminCommandes";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminClients from "./pages/admin/AdminClients";
/* 🛡️ Protection */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          {/* ===================== */}
          {/* 🌸 SITE PUBLIC */}
          {/* ===================== */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Catégories */}
          <Route path="/sirop" element={<CategoriePage titre="SIROP" categoryId={1} />} />
          <Route path="/huile" element={<CategoriePage titre="HUILE" categoryId={2} />} />
          <Route path="/creme" element={<CategoriePage titre="CRÈME" categoryId={3} />} />
          <Route path="/accessoires" element={<CategoriePage titre="ACCESSOIRES" categoryId={4} />} />
          <Route path="/the" element={<CategoriePage titre="THÉ / DÉTOX" categoryId={5} />} />

          <Route path="/conseil" element={<Conseil />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/article/:id" element={<ArticlePage />} />

          {/* Auth client */}
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/panier" element={<PanierPage />} />
          <Route path="/account" element={<Account />} />


          {/* ===================== */}
          {/* 🧠 DASHBOARD ADMIN (PROTÉGÉ) */}
          {/* ===================== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="produits" element={<AdminProduits />} />
            <Route path="commandes" element={<AdminCommandes />} />
            <Route path="stock" element={<AdminStock />} />
            <Route path="clients" element={<AdminClients />} />

          </Route>

          {/* ===================== */}
          {/* ❌ 404 */}
          {/* ===================== */}
          <Route path="*" element={<div className="p-10 text-center">Page introuvable</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
