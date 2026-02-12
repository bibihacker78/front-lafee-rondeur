import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, motDePasse);

            if (!data?.token) {
                setError("Identifiants incorrects");
                return;
            }

            // 🔐 Stockage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // 🧠 Vérification du rôle
            if (data.user.role !== "admin") {
                setError("Accès réservé à l’administrateur");
                localStorage.clear();
                return;
            }

            // 🚀 Redirection admin
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err?.message || "Erreur de connexion");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
                    Admin Login
                </h1>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email admin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 border rounded-lg"
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    className="w-full mb-6 px-4 py-3 border rounded-lg"
                    required
                />

                <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold">
                    Connexion
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
