import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Event } from "../eventTypes";

export default function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        let ignore = false;
        (async () => {
            const res = await fetch(`/api/events/${id}`);
            if (!res.ok) return;
            const json: Event = await res.json();
            if (!ignore) setEvent(json);
        })();
        return () => {
            ignore = true;
        };
    }, [id]);

    if (!event) return <div>Načítám...</div>;

    return (
        <div>
            <h1>Detail události</h1>
            <h2>{event.title}</h2>
            <p>Místo: {event.location}</p>

            <table>
                <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Odpověď</th>
                </tr>
                </thead>
                <tbody>
                {(event.dates?.[0]?.records ?? []).map((r, i) => (
                    <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.answer}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
