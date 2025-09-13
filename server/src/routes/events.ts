
import { Router } from "express";
import * as repo from "../repo";

const router = Router();


router.get("/events", (req, res) => {
    const items = repo.getEvents();
    res.json({ items });
});


router.get("/events/:id", (req, res) => {
    const id = Number(req.params.id);
    const event = repo.getEventById(id);
    if (!event) return res.status(404).json({ error: "Událost nenalezena" });
    res.json(event);
});


router.post("/events", (req, res) => {
    try {
        const created = repo.createEvent(req.body); // { title, location?, dates: number[] }
        res.status(201).json(created);
    } catch (e: any) {

        res.status(400).json({ error: e?.message ?? "Neplatný payload" });
    }
});

export default router;
