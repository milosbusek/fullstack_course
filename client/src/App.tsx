import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetail";
import NewEvent from "./components/NewEvent";


export default function App() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/events");
                const json = await res.json(); // { items: Event[] }
                setEvents(json.items ?? []);
            } catch {
                setEvents([]);
            }
        })();
    }, []);

    return (
        <div style={{ padding: 12 }}>
            <nav style={{ marginBottom: 16 }}>
                <Link to="/events" style={{ marginRight: 12 }}>
                    Seznam událostí
                </Link>
                <Link to="/events/new">Přidat událost</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Navigate to="/events" replace />} />
                <Route path="/events" element={<EventsList events={events} />} />
                <Route path="/events/new" element={<NewEvent />} />
                <Route path="/events/:id" element={<EventDetail />} />
            </Routes>
        </div>
    );
}