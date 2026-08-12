import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function Form() {
    
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        event_date: "",
        start_time: "",
        end_time: "",
        location: "",
        price: "",
        capacity: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    
    useEffect(() => {
        if (id) {
            // Fetch the event data for the given ID
            const fetchEvent = async () => {
                try {
                    const response = await api.get(`/events/${id}`);
                    setFormData(response.data);
                    console.log( response.data);
                } catch (error) {
                    console.error("Error fetching event:", error);
                }
            };

            fetchEvent();
            
        }
    }, [id]);

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
            const response = await api.post("/events", formData);

            console.log("Event created:", response.data);

            alert(
                response.data.message ||
                "Événement créé avec succès !"
            );

            // vider le formulaire après création
            setFormData({
                title: "",
                description: "",
                event_date: "",
                start_time: "",
                end_time: "",
                location: "",
                price: "",
                capacity: "",
            });

        } catch (error) {
            console.error("Error creating event:", error);

            const message =
                error.response?.data?.message ||
                "Erreur lors de la création de l'événement.";

            setError(message);
            alert(message);

        } finally {
            // مهم بزاف
            setLoading(false);
        }
        navigate("/dashboard/dashboardAdmin");
    };

    // Loading هنا، خارج handleSubmit
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Créer un événement
            </h1>

            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg max-w-2xl mx-auto mb-6">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto"
            >

                {/* Titre */}
                <div className="mb-5">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="title"
                    >
                        Titre
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Entrez le titre de l'événement"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-5">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Décrivez votre événement"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Date */}
                <div className="mb-5">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="event_date"
                    >
                        Date de l'événement
                    </label>

                    <input
                        id="event_date"
                        name="event_date"
                        type="date"
                        value={formData.event_date}
                        onChange={handleChange}
                        className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Horaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                    <div>
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="start_time"
                        >
                            Heure de début
                        </label>

                        <input
                            id="start_time"
                            name="start_time"
                            type="time"
                            value={formData.start_time}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="end_time"
                        >
                            Heure de fin
                        </label>

                        <input
                            id="end_time"
                            name="end_time"
                            type="time"
                            value={formData.end_time}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                </div>

                {/* Location */}
                <div className="mb-5">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="location"
                    >
                        Lieu
                    </label>

                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Ex: Casablanca, Salle 1"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Prix + Capacité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                    <div>
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="price"
                        >
                            Prix (DH)
                        </label>

                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Ex: 50"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="capacity"
                        >
                            Capacité
                        </label>

                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="1"
                            placeholder="Ex: 100"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow disabled:bg-gray-400"
                >
                    Créer l'événement
                </button>

            </form>
        </div>
    );
}