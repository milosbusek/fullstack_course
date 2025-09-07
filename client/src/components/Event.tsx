import { DateRecord } from "../types";

type EventProps = {
    id: number;
    title: string;
    location?: string;
    dates: DateRecord[];
};

export default function Event({ id, title, location, dates }: EventProps) {
    return (
        <li>
            <a href={`/events/${id}`}>
                {title} {location && <span>({location})</span>}
            </a>
        </li>
    );
}
