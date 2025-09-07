import { EventsResponse } from "../types";

type EventsListProps = {
    events: EventsResponse;
};

export default function EventsList({ events }: EventsListProps) {
    return (
        <ul>
            {events.items.map((e) => (
                <li key={e.id}>
                    <a href={`/events/${e.id}`}>
                        {e.title} {e.location && <span>({e.location})</span>}
                    </a>
                </li>
            ))}
        </ul>
    );
}
