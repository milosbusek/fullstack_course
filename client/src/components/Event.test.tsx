import { vi } from "vitest";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Event from "./Event";
import type { components } from "../EventTypes";

describe("Event component", () => {
    it("vykreslí název a lokaci události", () => {
        const mockEvent: components["schemas"]["Event"] = {
            id: 1,
            title: "Testovací akce",
            location: "Praha",
            dates: [],
        };

        render(
            <MemoryRouter>
                <Event event={mockEvent} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Testovací akce/)).toBeInTheDocument();
        expect(screen.getByText(/Praha/)).toBeInTheDocument();
    });
});
