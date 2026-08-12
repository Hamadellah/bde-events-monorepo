import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function DashboardAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchEvents = async () => {
    try {
      const response = await api.get("/tableboard");
      console.log("API RESPONSE:", response.data);
      if (Array.isArray(response.data.data)) {
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

  useEffect(() => {
    fetchEvents();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                  les places restantes: {event.placerest}
                </p>
                <p>
                  réservations: {event.reservation_count}
                </p>

              </div>

              <button
  onClick={() => handleModify(event.id)}
  className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  modifier
</button>
<button
  onClick={() => handleDelete(event.id)}
  className="w-full mt-5 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
>
  supprimer
</button>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}