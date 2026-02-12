const BASE_URL = "http://localhost:3000";
const API_URL = `${BASE_URL}/api/utilisateur`;
const API_CAT_URL = `${BASE_URL}/api/produits/categorie`;
const API_PRODUCTS_URL = `${BASE_URL}/api/produits`;
const API_PANIER_URL = `${BASE_URL}/api/panier`;
const API_AVIS_URL = `${BASE_URL}/api/avis`;
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility to safely parse responses and surface useful errors when server
// returns non-JSON (HTML error pages) which would otherwise crash with
// "Unexpected token '<'" during response.json().
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  // Try parse JSON when available
  if (response.ok) {
    if (contentType.includes('application/json')) {
      return response.json();
    }
    // Successful but not JSON — return text for diagnostics
    const text = await response.text();
    throw new Error(text || `Unexpected response with status ${response.status}`);
  }

  // Not ok: try JSON first, else return text
  try {
    if (contentType.includes('application/json')) {
      const errData = await response.json();
      throw new Error(errData.message || JSON.stringify(errData));
    }
  } catch (e) {
    // fallthrough to read text
  }

  const errText = await response.text();
  throw new Error(errText || `HTTP ${response.status}`);
};



export const registerUser = async (nom, email, mot_de_passe) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, email, mot_de_passe }),
  });
  return response.json();
};

export const loginUser = async (email, motDePasse) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      mot_de_passe: motDePasse,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("API login error response:", data);
    throw new Error(data.message || "Erreur login");
  }

  return data;
};

export const addproduit = async (produitData) => {
  // produitData doit être un FormData pour l'upload d'images
  const response = await fetch(`${API_PRODUCTS_URL}`, {
    method: "POST",
    body: produitData,
  });
  return handleResponse(response);
}

export const getProductsByCategoryId = async (id) => {
  const response = await fetch(`${API_CAT_URL}/${id}`);
  return response.json();
  
};
// Exporte cette constante pour l'utiliser dans tes composants
export const getImageUrl = (imagePath) => {
  // Si le chemin commence déjà par 'http' ou '//', c'est une URL complète
  if (imagePath && (imagePath.startsWith('http') || imagePath.startsWith('//'))) {
    return imagePath;
  }
  
  // Sinon, c'est un chemin relatif, ajoute l'URL de base
  return `${BASE_URL}/${imagePath}`;
};


// Fonction pour récupérer un produit par son ID
export const getProduitById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/produits/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    throw error;
  }
};

export const updateProduit = async (id, produitData) => { 
  const response = await fetch(`${API_PRODUCTS_URL}/${id}`, { 
    method: "PUT", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(produitData), 
  }); 
  return handleResponse(response);
}

export const deleteProduit = async (id) => { 
  const response = await fetch(`${API_PRODUCTS_URL}/${id}`, { 
    method: "DELETE", 
    headers: { "Content-Type": "application/json" }, 
  }); 
  return handleResponse(response);
};

// Fonction pour ajouter au panier 

export const addToCart = async ({ utilisateur_id, produit_id, quantite }) => { 
  try { 
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_PANIER_URL}/`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }, 
      body: JSON.stringify({ utilisateur_id, produit_id, quantite }), 
    });
    const data = await response.json(); 
    return data; 
  } catch (error) { 
    console.error("Erreur lors de l'ajout au panier :", error); 
    throw error; 
  } 
};

export const getUserCart = async (utilisateur_id) => {
  try {
    const response = await fetch(`${API_PANIER_URL}/user/${utilisateur_id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    throw error;
  }
};

export const updateCart = async (utilisateur_id, produit_id, quantite) => {
  try {
    const response = await fetch(`${API_PANIER_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ utilisateur_id, produit_id, quantite }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    throw error;
  }
};

export async function deleteFromCart(itemId) {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  const response = await fetch(`${API_PANIER_URL}/item/${itemId}`, {
    method: 'DELETE',
    credentials: 'include', // Include credentials (cookies, etc.)
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erreur lors de la suppression');
  }

  return await response.json();
}

export const clearCart = async (utilisateur_id) => {
  try {
    const response = await fetch(`${API_PANIER_URL}/clear/${utilisateur_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la vidange du panier:", error);
    throw error;
  }
};
export const getUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token d'authentification manquant");
    }
    
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      // Si le statut n'est pas 2xx, on lance une erreur
      const errorText = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Réponse non-JSON:", text);
      throw new Error("La réponse n'est pas au format JSON");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(API_PRODUCTS_URL);
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_PRODUCTS_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    throw error;
  }
};
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categorie`);
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    throw error;
  }
};

export const getAdminStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur récupération admin stats:', error);
    throw error;
  }
};

export const getAdminClients = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/api/admin/clients`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur récupération clients admin:', error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/categorie/${id}`);
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie:", error);
    throw error;
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Fonction pour récupérer le total du panier d'un utilisateur
export const getCartTotal = async (utilisateur_id) => {
  try {
    const response = await fetch(`${API_PANIER_URL}/user/${utilisateur_id}/total`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du total du panier:", error);
    throw error;
  }
};

export const getAvisByProduit = async (id) => {
  try {
    const response = await fetch(`${API_AVIS_URL}/produit/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'avis:", error);
    throw error;
  }
}
export const addAvis = async (avisData) => {
  try {
    const response = await fetch(API_AVIS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(avisData),
    });   
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'ajout de l'avis");
    }
    const data = await response.json();
    toast.success("Avis ajouté avec succès !");
    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis:", error);
    toast.error(`Erreur: ${error.message}`);
    throw error;
  }
};

