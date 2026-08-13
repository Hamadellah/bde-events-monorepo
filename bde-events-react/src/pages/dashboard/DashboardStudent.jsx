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

     
       if (Array.isArray(response.data.data)) {
        setEvents(response.data.data);
      } else {
        setEvents([]);
        console.error("Les événements ne sont pas un tableau:", response.data);
      }
      console.log(response.data.data);

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
const handleReserve = async (eventId) => {
  try {
    const response = await api.post(`events/${eventId}/reserve`);
    console.log('Réservation réussie:', response.data);
    alert(response.data.message || 'Réservation réussie !');
  }catch (error) {
    console.error('Erreur lors de la réservation:', error);
    alert(error.response.data.message || 'Erreur lors de la réservation.');
  }
}
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Les événements
        </h1>
        <div className="flex items-center space-x-4">
          <button onclick={navigate("/tickets")} className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
            Mes billets
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

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
  onClick={() => handleReserve(event.id)}
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