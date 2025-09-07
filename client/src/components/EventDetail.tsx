import { Event } from "../types";

type EventDetailProps = {
    event: Event;
};

export default function EventDetail({ event }: EventDetailProps) {
    return (
        <div>
            <h2>{event.title}</h2>
            <p>Místo: {event.location}</p>
            <h3>Termíny</h3>
            <ul>
                {event.dates?.map((d, i) => (
                    <li key={i}>
                        {new Date(d.timestamp!).toLocaleDateString("cs-CZ")}
                        <ul>
                            {d.records?.map((r, j) => (
                                <li key={j}>
                                    {r.name}: {r.answer}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
