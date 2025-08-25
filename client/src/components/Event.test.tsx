
import { render, screen } from "@testing-library/react";
import { Event, DateRecord } from "./Event";

describe("Event component", () => {
    const mockDates: DateRecord[] = [
        {
            timestamp: new Date("2025-08-25").getTime(),
            records: [
                { name: "Alice", answer: "yes" },
                { name: "Bob", answer: "no" },
            ],
        },
        {
            timestamp: new Date("2025-08-26").getTime(),
            records: [
                { name: "Alice", answer: "if-needed" },
                { name: "Bob", answer: "yes" },
            ],
        },
    ];

    it("renders title and location", () => {
        render(<Event id="1" title="Test Event" location="Plzeň" dates={mockDates} />);
        expect(screen.getByText("Test Event")).toBeInTheDocument();
        expect(screen.getByText(/Plzeň/)).toBeInTheDocument();
    });

    it("renders table with participants and votes", () => {
        render(<Event id="1" title="Test Event" dates={mockDates} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getAllByText("✅").length).toBe(2);
        expect(screen.getByText("❌")).toBeInTheDocument();
        expect(screen.getByText("❔")).toBeInTheDocument();
    });

    it("handles empty dates", () => {
        render(<Event id="2" title="Empty Event" dates={[]} />);
        expect(screen.getByText("Žádné termíny nejsou k dispozici.")).toBeInTheDocument();
    });
});