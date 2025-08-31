import { render, screen, within } from "@testing-library/react";
import { Event, type DateRecord } from "./Event";

const mockDates: DateRecord[] = [
    {
        timestamp: new Date("2025-09-16").getTime(),
        records: [
            { name: "Honza", answer: "yes" },
            { name: "Jana",  answer: "no"  },
        ],
    },
    {
        timestamp: new Date("2025-09-17").getTime(),
        records: [
            { name: "Jana",  answer: "no"  },
        ],
    },
];

describe("Event component", () => {
    it("renders title and location", () => {
        render(<Event title="Tým building" location="Praha" dates={mockDates} />);

        expect(screen.getByText("Tým building")).toBeInTheDocument();
        expect(screen.getByText(/Místo:\s*Praha/)).toBeInTheDocument();
    });

    it("renders table with participants and votes (kontrola po řádcích)", () => {
        render(<Event title="Test Event" location="Praha" dates={mockDates} />);

        // Hlavičky tabulky
        expect(screen.getByText("Účastník")).toBeInTheDocument();
        expect(screen.getByText("16. 9. 2025")).toBeInTheDocument();
        expect(screen.getByText("17. 9. 2025")).toBeInTheDocument();

        // Najdu řádek pro Honzu a ověřím, že obsahuje právě jedno "yes" (U+2705) a žádné "no" (U+274C)
        const honzaRow = screen.getByRole("row", { name: /Honza/ });
        expect(within(honzaRow).getAllByText("\u2705")).toHaveLength(1);
        expect(within(honzaRow).queryByText("\u274C")).toBeNull();
        expect(within(honzaRow).queryByText("\u2754")).toBeNull();

        // Najdu řádek pro Janu a ověřím, že obsahuje 2× "no" (U+274C) a žádné "yes" (U+2705)
        const janaRow = screen.getByRole("row", { name: /Jana/ });
        expect(within(janaRow).getAllByText("\u274C")).toHaveLength(2);
        expect(within(janaRow).queryByText("\u2705")).toBeNull();
        expect(within(janaRow).queryByText("\u2754")).toBeNull();

        // Ověřím, že ve vší tabulce se nikde nevyskytuje "if-needed" (U+2754)
        expect(screen.queryByText("\u2754")).toBeNull();
    });

    it("handles empty dates", () => {
        render(<Event title="Bez termínů" location="Praha" dates={[]} />);

        expect(
            screen.getByText("Žádné termíny nejsou k dispozici.")
        ).toBeInTheDocument();

        // Tabulka se nemá vyrenderovat
        expect(screen.queryByText("Účastník")).not.toBeInTheDocument();
    });
});
