import { useState, FormEvent } from "react";
import type { NewEventPayload } from "../EventTypes";

const NewEvent = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const payload: NewEventPayload = {
            title,
            location: location || undefined,
            // v tomto formuláři žádné datumy nevybíráme – pošleme prázdné pole
            dates: [],
        };

        try {
            await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
                        setTitle("");
            setLocation("");
        } catch {
            // tady by šla zobrazit chyba
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                placeholder="název akce"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                placeholder="místo"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Přidat událost</button>
        </form>
    );
};

export default NewEvent;
