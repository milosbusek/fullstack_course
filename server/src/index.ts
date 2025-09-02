import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

interface Record {
    name: string;
    answer: string;
}

interface DateOption {
    timestamp: number;
    records: Record[];
}

interface Event {
    id: number;
    location: string;
    title: string;
    dates: DateOption[];
}

const events: Event[] = [
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


app.get("/api/events", (req: Request, res: Response) => {
    res.json({ items: events });
});

app.get("/api/events/:id", (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id);
    const event = events.find((e) => e.id === eventId);
    if (!event) {
        return res.status(404).json({ error: "Událost nenalezena" });
    }
    res.json(event);
});


app.post("/api/events", (req: Request, res: Response) => {
    const { title, location, dates } = req.body;

    if (!title || !Array.isArray(dates)) {
        return res.status(400).json({ error: "Neplatná data" });
    }

    const newEvent: Event = {
        id: events.length + 1,
        location: location || "",
        title,
        dates: dates.map((timestamp: number) => ({
            timestamp,
            records: []
        }))
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});