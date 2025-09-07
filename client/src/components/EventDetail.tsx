import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Event from "./Event";
import { useWeather } from "../hooks/useWeather";

type DateRecord = { timestamp: number; records: { name: string; answer: "yes" | "no" | "if-needed" }[] };
type PollingEvent = { id: number; title: string; location?: string; dates: DateRecord[] };

const API = "http://localhost:4000";

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<PollingEvent | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
    const { state: weather, getWeather } = useWeather();

    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        setStatus("loading");
        fetch(`${API}/api/events/${id}`)
            .then(async (r) => {
                if (!r.ok) throw new Error(String(r.status));
                const json: PollingEvent = await r.json();
                if (!cancelled) {
                    setEvent(json);
                    setStatus("success");
                }
            })
            .catch(() => !cancelled && setStatus("error"));
        return () => {
            cancelled = true;
        };
    }, [id]);

    useEffect(() => {
        if (!event) return;
        if (event.location) getWeather(event.location);
    }, [event?.id]);

    if (status === "loading") return <p>Načítám…</p>;
    if (status === "error") return <p>Událost nebyla nalezena.</p>;
    if (!event) return null;

    return (
        <div>
            <h1>Detail události: {event.title}</h1>
            {event.location ? <p>Místo: {event.location}</p> : null}
            {weather.status === "success" ? (
                <div style={{ margin: "8px 0 16px" }}>
                    <strong>Počasí dnes: </strong>
                    <span>{weather.tempNowC} °C (open-meteo.com)</span>
                </div>
            ) : null}
            <Event location={event.location} title={event.title} dates={event.dates} />
        </div>
    );
};

export default EventDetail;
