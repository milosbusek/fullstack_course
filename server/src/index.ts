import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

type UserRecord = { name: string; answer: "yes" | "no" | "if-needed" };
type DateRecord = { timestamp: number; records: UserRecord[] };
type Event = { id: number; title: string; location?: string; dates: DateRecord[] };

let events: Event[] = [
    {
        id: 1,
        location: "Praha",
        title: "Super akce",
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: "Honza", answer: "yes" },
                    { name: "Jana", answer: "no" }
                ]
            },
            {
                timestamp: 1726600861177,
                records: [{ name: "Jana", answer: "no" }]
            }
        ]
    },
    {
        id: 2,
        location: "Brno",
        title: "Super akce 2",
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: "Honza", answer: "no" },
                    { name: "Jana", answer: "no" },
                    { name: "Petr", answer: "no" }
                ]
            },
            {
                timestamp: 1726600861177,
                records: [{ name: "Jana", answer: "no" }]
            }
        ]
    }
];

app.get("/api/events", (_req: Request, res: Response) => {
    res.json({ items: events });
});

app.get("/api/events/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const found = events.find(e => e.id === id);
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
});

app.post("/api/events", (req: Request, res: Response) => {
    const body = req.body as { title?: string; location?: string; dates?: number[] };

    if (!body || typeof body.title !== "string" || !Array.isArray(body.dates) || body.dates.length < 1) {
        return res.status(400).json({ message: "Invalid payload" });
    }

    const newEvent: Event = {
        id: Math.max(0, ...events.map(e => e.id)) + 1,
        title: body.title,
        location: body.location,
        dates: body.dates.map(ts => ({ timestamp: ts, records: [] }))
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
