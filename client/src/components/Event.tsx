import { Link } from "react-router-dom";
import type { Event } from "../eventTypes";

type Props = { event: Event };

export default function EventItem({ event }: Props) {
    return (
        <li>
            <Link to={`/events/${event.id}`}>
                {event.title} – {event.location}
            </Link>
        </li>
    );
}
