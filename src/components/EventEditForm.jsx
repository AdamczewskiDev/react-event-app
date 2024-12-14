import React, { useState, useEffect } from "react";

const EventEditForm = ({ event, onEventUpdated }) => {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.date);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEvent = { title, description, date };
        try {
            const response = await fetch(`/api/events/${event.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvent),
            });

            if (response.ok) {
                const savedEvent = await response.json();
                onEventUpdated(savedEvent);
            } else {
                console.error("Błąd podczas edytowania wydarzenia");
            }
        } catch (error) {
            console.error("Błąd sieci:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Tytuł:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Opis:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Zaktualizuj wydarzenie</button>
        </form>
    );
};

export default EventEditForm;
