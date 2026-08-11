
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
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
      const response = await api.post("/register", formData);

      console.log("Register:", response.data);

      // Si Laravel retourne un token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Si Laravel retourne l'utilisateur
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // Après inscription → Login
      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        if (errors) {
          const firstError = Object.values(errors)[0][0];
          setError(firstError);
        } else {
          setError("Les informations sont invalides.");
        }
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Créer un compte
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Inscrivez-vous pour continuer
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nom
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@gmail.com"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Mot de passe
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Rôle
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="student">Student</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Vous avez déjà un compte ?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:underline"
          >
            Se connecter
          </button>
        </p>

      </div>

    </div>
  );
}

