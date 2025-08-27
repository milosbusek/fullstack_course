import { Event, type DateRecord } from "./components/Event";

function App() {
    const dates: DateRecord[] = [
        {
            timestamp: new Date().setHours(0, 0, 0, 0),
            records: [
                { name: "Alice", answer: "yes" },
                { name: "Bob", answer: "no" },
            ],
        },
        {
            timestamp: new Date(Date.now() + 86400000).setHours(0, 0, 0, 0),
            records: [
                { name: "Alice", answer: "if-needed" },
                { name: "Bob", answer: "yes" },
            ],
        },
    ];

    return (
        <div style={{ padding: 16 }}>
            <Event id="demo" title="Zkouška komponenty" location="Plzeň" dates={dates} />
        </div>
    );
}

export default App;
