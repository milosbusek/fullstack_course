import { Navigate, Route, Routes, Link } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetail";
import NewEvent from "./components/NewEvent";
import { EventsResponse, Event as EventType } from "./types";
import { useEffect, useState } from "react";

export default function App() {
    const [events, setEvents] = useState<EventsResponse | null>(null);
    const [detail, setDetail] = useState<EventType | null>(null);

    useEffect(() => {
        // přednačti seznam – pro /events
        fetch("/api/events")
            .then((r) => r.json())
            .then((data: EventsResponse) => setEvents(data))
            .catch(() => setEvents({ items: [] }));
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

                <Route
                    path="/events"
                    element={<EventsList events={events ?? { items: [] }} />}
                />

                <Route
                    path="/events/:id"
                    element={
                        <EventDetailLoader
                            detail={detail}
                            setDetail={(e) => setDetail(e)}
                        />
                    }
                />

                <Route path="/events/new" element={<NewEvent />} />
            </Routes>
        </div>
    );
}

function EventDetailLoader({
                               detail,
                               setDetail,
                           }: {
    detail: EventType | null;
    setDetail: (e: EventType) => void;
}) {
    // jednoduchý loader – přečte id z URL a načte detail
    const id = Number(window.location.pathname.split("/").pop());
    useEffect(() => {
        if (!Number.isFinite(id)) return;
        fetch(`/api/events/${id}`)
            .then((r) => r.json())
            .then((data: EventType) => setDetail(data))
            .catch(() => {});
    }, [id, setDetail]);

    if (!detail || detail.id !== id) return <div>Načítám…</div>;
    return <EventDetail event={detail} />;
}
