import { useEffect, useState } from "react";
import EventItem from "./Event";
import type { Event } from "../eventTypes";

export type EventsListProps = { events?: Event[] };

export default function EventsList({ events: input }: EventsListProps) {
    const [events, setEvents] = useState<Event[]>(input ?? []);

    useEffect(() => {
        if (input && input.length) return;

        (async () => {
            try {
                const res = await fetch("/api/events");
                const json = await res.json(); // { items: Event[] }
                setEvents(json.items ?? []);
            } catch {
                setEvents([]);
            }
        })();
    }, [input]);

    return (
        <>
            <h1>Seznam událostí</h1>
            <ul>
                {(events ?? []).map((e) => (
                    <EventItem key={e.id!} event={e} />
                ))}
            </ul>
        </>
    );
}
