import express from "express";
import cors from "cors";              // pro povolení požadavků z frontendu
import eventsRouter from "./routes/events"; // import našeho routeru

const app = express();

// Middleware
app.use(cors());          // povolí komunikaci frontend ↔ backend
app.use(express.json());  // umožní číst JSON v body

// Napojení routeru
app.use("/api", eventsRouter);
// → všechny endpointy z events.ts budou dostupné pod /api
// například: GET http://localhost:4000/api/events

// Start serveru
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
