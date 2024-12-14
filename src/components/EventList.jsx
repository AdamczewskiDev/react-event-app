import React from 'react';

function EventList({ events, deleteEvent }) {
  return (
    <div className="max-w-3xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Lista Wydarzeń</h2>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">Brak wydarzeń do wyświetlenia.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
              <button
                onClick={() => deleteEvent(event.id)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
