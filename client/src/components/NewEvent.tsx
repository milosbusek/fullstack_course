import { useState } from "react";
import { NewEventPayload } from "../types";

export default function NewEvent() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dates, setDates] = useState<number[]>([]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload: NewEventPayload = {
            title,
            location,
            dates,
        };

        await fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Název akce"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Místo"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Přidat událost</button>
        </form>
    );
}
