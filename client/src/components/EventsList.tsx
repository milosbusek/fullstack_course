import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type PollingEvent } from "../types";

const EventsList: React.FC = () => {
    const [events, setEvents] = useState<PollingEvent[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/events");
                if (!response.ok) {
                    throw new Error("Nepodařilo se načíst události");
                }
                const data = await response.json();
                setEvents(data.items);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchEvents();
    }, []);

    if (error) {
        return <p style={{ color: "red" }}>Chyba: {error}</p>;
    }

    return (
        <div>
            <h1>Seznam událostí</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>
                            {event.title} – {event.location}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;

