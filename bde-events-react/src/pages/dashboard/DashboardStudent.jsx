import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardStudent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");

      console.log("API RESPONSE:", response.data);

      // حسب structure ديال Laravel
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else if (Array.isArray(response.data.events)) {
        setEvents(response.data.events);
      } else if (Array.isArray(response.data.data)) {
        setEvents(response.data.data);
      } else {
        setEvents([]);
        console.error("Les événements ne sont pas un tableau:", response.data);
      }

    } catch (error) {
      console.error("ERROR:", error);
      setError(
        error.response?.data?.message ||
        "Impossible de charger les événements."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Les événements
      </h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {events.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center">
          Aucun événement disponible.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow p-6"
            >

              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {event.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {event.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600">

                <p>
                  📅 {event.event_date}
                </p>

                <p>
                  ⏰ {event.start_time} - {event.end_time}
                </p>

                <p>
                  📍 {event.location}
                </p>

                <p>
                  💰 {event.price} DH
                </p>

                <p>
                  👥 {event.capacity} places
                </p>

              </div>

              <button
                className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Réserver
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}