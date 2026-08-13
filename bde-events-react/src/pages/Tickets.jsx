import React from 'react';

export default function Tickets() {
  const tickets = [
    {
      title: "sd",
      event_date: "2026-07-17",
      start_time: "13:00:00",
      end_time: "11:05:00",
      location: "sdfghj",
      ticket_code: "50XrQKSRFg",
      reservation_code: "yj4MXKl45Q"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Mes Billets
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          ← Retour aux événements
        </button>
      </div>

      {/* Content */}
      {tickets.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center shadow text-gray-500">
          Vous n'avez aucun billet pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between"
            >
              <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  {ticket.title}
                </h2>

                {/* Event Details */}
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <p className="flex items-center gap-2">
                    <span>📅</span>
                    <strong className="text-gray-700">Date:</strong> {ticket.event_date}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>⏰</span>
                    <strong className="text-gray-700">Heure:</strong> {ticket.start_time} - {ticket.end_time}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    <strong className="text-gray-700">Lieu:</strong> {ticket.location}
                  </p>
                </div>

                {/* Codes Section */}
                <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Code Billet:</span>
                    <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">
                      {ticket.ticket_code}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Code Réservation:</span>
                    <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded font-bold">
                      {ticket.reservation_code}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 bg-gray-50 border-t">
                <button 
                  onClick={() => window.print()} 
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition text-sm font-medium"
                >
                  Télécharger / Imprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}