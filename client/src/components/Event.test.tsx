import { render, screen } from "@testing-library/react";
import Event from "./Event";
import { type DateRecord } from "../types";

describe("Event component", () => {
    it("renders title and location", () => {
        const dates: DateRecord[] = [];
        render(<Event title="Test Event" location="Praha" dates={dates} />);

        expect(screen.getByText("Test Event")).toBeInTheDocument();
        // stačí ověřit, že se místo i text Praha objeví
        expect(screen.getByText(/Místo:/i)).toBeInTheDocument();
        expect(screen.getByText("Praha")).toBeInTheDocument();
    });

    it("renders table with participants and votes", () => {
        const dates: DateRecord[] = [
            {
                timestamp: new Date("2025-09-16T12:00:00Z").getTime(),
                records: [
                    { name: "Alice", answer: "yes" },
                    { name: "Bob", answer: "no" },
                ],
            },
        ];

        render(<Event title="X" location="Praha" dates={dates} />);

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        // ✔ a ✖ v tabulce
        expect(screen.getAllByText("\u2705").length).toBeGreaterThan(0);
        expect(screen.getAllByText("\u274C").length).toBeGreaterThan(0);
    });
});
