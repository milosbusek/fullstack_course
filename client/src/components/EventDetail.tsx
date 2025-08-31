import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/mockData";
import Event from "./Event";
import { type PollingEvent } from "../types";
import { useWeather } from "../hooks/useWeather";

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event: PollingEvent | undefined = data.find((e) => e.id === id);

    if (!event) {
        return <p>Událost nebyla nalezena.</p>;
    }

    // Počasí pro lokaci události (pokud je)
    const weather = useWeather(event.location);

    return (
        <div>
            <h1>Detail události: {event.title}</h1>

            {event.location && <p>Místo: {event.location}</p>}

            {/* Panel počasí */}
            {event.location && (
                <div style={{ margin: "8px 0 16px" }}>
                    <strong>Počasí dnes: </strong>
                    {weather.status === "idle" && <span>—</span>}
                    {weather.status === "loading" && <span>Načítám…</span>}
                    {weather.status === "error" && (
                        <span>Chyba: {weather.error}</span>
                    )}
                    {weather.status === "success" && (
                        <span>
              {weather.tempNowC} °C <small>({weather.source})</small>
            </span>
                    )}
                </div>
            )}

            <Event location={event.location} title={event.title} dates={event.dates} />
        </div>
    );
};

export default EventDetail;
