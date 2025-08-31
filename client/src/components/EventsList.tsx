import React from "react";
import { Link } from "react-router-dom";
import { type EventsListProps } from "../types";

export const EventsList: React.FC<EventsListProps> = ({ data }) => {
    return (
        <div>
            <h1>Seznam událostí</h1>
            <ul>
                {data.map((event) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;
