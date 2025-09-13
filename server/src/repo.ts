
import db from "./db";

/** Datové typy pro vstup z API */
export type NewEventInput = {
    title: string;
    location?: string;
    dates: number[];
};

/** Pomocná mapovací funkce: načte celou událost včetně dat a hlasů */
function mapEvent(row: { id: number; title: string; location: string | null }) {
    const dateRows = db
        .prepare("SELECT id, timestamp FROM event_dates WHERE event_id = ? ORDER BY id")
        .all(row.id) as { id: number; timestamp: number }[];

    const dates = dateRows.map((d) => {
        const records = db
            .prepare("SELECT name, answer FROM votes WHERE date_id = ? ORDER BY id")
            .all(d.id) as { name: string; answer: "yes" | "no" | "maybe" }[];

        return { timestamp: d.timestamp, records };
    });

    return {
        id: row.id,
        title: row.title,
        location: row.location ?? undefined,
        dates,
    };
}

/** Vrátí seznam událostí (klidně včetně vnořených dat) */
export function getEvents() {
    const rows = db
        .prepare("SELECT id, title, location FROM events ORDER BY id")
        .all() as { id: number; title: string; location: string | null }[];

    return rows.map(mapEvent);
}

/** Vrátí detail události dle ID, nebo undefined */
export function getEventById(id: number) {
    const row = db
        .prepare("SELECT id, title, location FROM events WHERE id = ?")
        .get(id) as { id: number; title: string; location: string | null } | undefined;

    if (!row) return undefined;
    return mapEvent(row);
}

/** Vytvoří událost + její termíny v transakci a vrátí nově vytvořený záznam */
export function createEvent(input: NewEventInput) {
    const insertEvent = db.prepare(
        "INSERT INTO events (title, location, created_at) VALUES (?, ?, ?)"
    );
    const insertDate = db.prepare(
        "INSERT INTO event_dates (event_id, timestamp) VALUES (?, ?)"
    );

    const tx = db.transaction((payload: NewEventInput) => {
        const info = insertEvent.run(payload.title, payload.location ?? null, Date.now());
        const eventId = Number(info.lastInsertRowid);

        for (const ts of payload.dates ?? []) {
            insertDate.run(eventId, ts);
        }

        return eventId;
    });

    const newId = tx(input);
    return getEventById(newId)!;
}
