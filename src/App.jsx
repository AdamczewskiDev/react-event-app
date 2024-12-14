import React, { useState } from "react";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import EventEditForm from "./components/EventEditForm";

const App = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEventAdded = (newEvent) => {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEventUpdated = (updatedEvent) => {
      setEvents((prevEvents) =>
          prevEvents.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
          )
      );
      setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
      setEditingEvent(event);
  };

  console.log("Wydarzenia:", events); // Dodaj logowanie stanu events

  return (
      <div>
          <EventForm onEventAdded={handleEventAdded} />
          {editingEvent ? (
              <EventEditForm
                  event={editingEvent}
                  onEventUpdated={handleEventUpdated}
              />
          ) : (
              <EventList events={events} onEditEvent={handleEditEvent} />
          )}
      </div>
  );
};


export default App;
