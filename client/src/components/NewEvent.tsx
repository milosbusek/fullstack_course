import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:4000";

const NewEvent: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dates, setDates] = useState<string[]>([""]);
    const [error, setError] = useState<string | null>(null);

    function setDateAt(i: number, v: string) {
        setDates((prev) => prev.map((x, idx) => (idx === i ? v : x)));
    }
    function addDate() {
        if (dates.length < 10) setDates((p) => [...p, ""]);
    }
    function removeDate(i: number) {
        setDates((p) => p.filter((_, idx) => idx !== i));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!title.trim()) return;

        const parsed = dates
            .map((v) => v && !Number.isNaN(Date.parse(v)) ? Date.parse(v) : null)
            .filter((x): x is number => x !== null);

        try {
            const r = await fetch(`${API}/api/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    location: location || undefined,
                    dates: parsed
                })
            });
            if (!r.ok) {
                throw new Error("Bad Request");
            }
            navigate("/events");
        } catch {
            setError("Odeslání selhalo, server není dostupný");
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Název události:
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Zadejte název události"
                    />
                </label>
            </div>
            <div>
                <label>
                    Místo:
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Zadejte místo"
                    />
                </label>
            </div>

            {dates.map((v, i) => (
                <div key={i}>
                    <input
                        type="datetime-local"
                        value={v}
                        onChange={(e) => setDateAt(i, e.target.value)}
                    />
                    <button type="button" onClick={() => removeDate(i)}>Odebrat</button>
                </div>
            ))}
            <button type="button" onClick={addDate} disabled={dates.length >= 10}>
                Přidat datum
            </button>

            <div style={{ marginTop: 12 }}>
                <button type="submit">Přidat událost</button>
            </div>

            {error && <p style={{ color: "crimson" }}>{error}</p>}
        </form>
    );
};

export default NewEvent;

