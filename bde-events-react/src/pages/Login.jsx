
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", formData);

      console.log("Login response:", response.data);

      // Récupérer le token
      const token = response.data.token;

      // Récupérer l'utilisateur
      const user = response.data.user;

      // Vérifier que token et user existent
      if (!token || !user) {
        setError("Réponse du serveur invalide.");
        return;
      }

      // Stocker le token
      localStorage.setItem("token", token);

      // Stocker l'utilisateur
      localStorage.setItem("user", JSON.stringify(user));

      // Redirection selon le rôle
      if (user.role === "admin") {
        navigate("/dashboard/dashboardAdmin");
      } else if (user.role === "student") {
        navigate("/dashboard/dashboardStudent");
      } else {
        setError("Rôle utilisateur non reconnu.");
      }

    } catch (error) {
      console.error(error);

      if (error.response?.status === 422) {
        setError("Email ou mot de passe incorrect.");
      } else if (error.response?.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Connexion
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Connectez-vous à votre compte
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@gmail.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Mot de passe
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

      </div>
    </div>
  );
}

