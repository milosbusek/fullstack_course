import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/mockData";
import Event from "./Event";
import { type PollingEvent } from "../types";
import { useWeather } from "../hooks/useWeather";

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event: PollingEvent | undefined = data.find((e) => e.id === id);

    const { state: weather, getWeather } = useWeather();

    useEffect(() => {
        if (event?.location) {
            getWeather(event.location);
        }
    }, [event?.id]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!event) {
        return <p>Událost nebyla nalezena.</p>;
    }

    return (
        <div>
            <h1>Detail události: {event.title}</h1>
            {event.location && <p>Místo: {event.location}</p>}

            <div style={{ margin: "8px 0 16px" }}>
                <strong>Počasí dnes: </strong>
                {weather.status === "loading" && <span>Načítám…</span>}
                {weather.status === "error" && <span>Nelze načíst</span>}
                {weather.status === "success" && (
                    <span>
            {weather.tempNowC} °C ({weather.source})
          </span>
                )}
            </div>

            <Event location={event.location} title={event.title} dates={event.dates} />
        </div>
    );
};

export default EventDetail;
