import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventsList from "./EventsList";
import type { PollingEvent } from "../types";

const sample: PollingEvent[] = [
    { id: "1", title: "Akce A", location: "Praha", dates: [] },
    { id: "2", title: "Akce B", location: "Plzeň", dates: [] },
];

test("zobrazí položky a odkazy", () => {
    render(
        <MemoryRouter>
            <EventsList data={sample} />
        </MemoryRouter>
    );

    // Ověříme, že názvy událostí jsou vidět
    expect(screen.getByText("Akce A")).toBeInTheDocument();
    expect(screen.getByText("Akce B")).toBeInTheDocument();

    // Ověříme odkaz na detail první události
    const link = screen.getByRole("link", { name: "Akce A" });
    expect(link).toHaveAttribute("href", "/events/1");
});
