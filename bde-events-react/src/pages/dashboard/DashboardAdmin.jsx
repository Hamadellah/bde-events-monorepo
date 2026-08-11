import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardStudent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await api.get("/events");

        console.log("Events:", response.data);

        setEvents(response.data);
      } catch (error) {
        console.error(error);
        setError("Impossible de récupérer les événements.");
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement des événements...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">
            BDE Events
          </h1>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Événements
          </h2>

          <p className="text-gray-500 mt-2">
            Découvrez les prochains événements.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Events */}
        {events.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">
              Aucun événement disponible.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition"
              >

                <div className="h-40 bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-5xl">
                    🎉
                  </span>
                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">

                    <p>
                      📅{" "}
                      <span className="font-medium">
                        {event.event_date}
                      </span>
                    </p>

                    <p>
                      ⏰{" "}
                      {event.start_time} - {event.end_time}
                    </p>

                    <p>
                      📍{" "}
                      {event.location}
                    </p>

                    <p>
                      💰{" "}
                      {event.price} DH
                    </p>

                    <p>
                      👥{" "}
                      Capacité : {event.capacity}
                    </p>

                  </div>

                  <button
                    className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Voir l'événement
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}