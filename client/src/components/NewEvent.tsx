import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_DATES = 10;

const NewEvent: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dates, setDates] = useState<string[]>([""]);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    function addDate() {
        if (dates.length >= MAX_DATES) return;
        setDates((d) => [...d, ""]);
    }

    function removeDate(i: number) {
        setDates((d) => d.filter((_, idx) => idx !== i));
    }

    function changeDate(i: number, value: string) {
        setDates((d) => d.map((v, idx) => (idx === i ? value : v)));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!title.trim()) return;

        const ts = dates
            .map((v) => v && Date.parse(v))
            .filter((n): n is number => Number.isFinite(n));

        setSubmitting(true);
        try {
            const r = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: title,
                    location: location || undefined,
                    title,
                    dates: ts,
                }),
            });

            if (!r.ok) {
                setError("Odeslání selhalo, server není dostupný");
                return;
            }

            const created = await r.json().catch(() => null);
            const newId =
                created?.id ??
                String(Date.now());

            navigate(`/events/${newId}`);
        } catch {
            setError("Odeslání selhalo, server není dostupný");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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

            <div style={{ marginTop: 8, marginBottom: 8 }}>
                {dates.map((v, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <input
                            type="datetime-local"
                            value={v}
                            onChange={(e) => changeDate(i, e.target.value)}
                        />
                        <button type="button" onClick={() => removeDate(i)}>
                            Odebrat
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addDate}
                    disabled={dates.length >= MAX_DATES}
                >
                    Přidat datum
                </button>
            </div>

            <button type="submit" disabled={submitting}>
                Přidat událost
            </button>

            {error && (
                <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>
            )}
        </form>
    );
};

export default NewEvent;
