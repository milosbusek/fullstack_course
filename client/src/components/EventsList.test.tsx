import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventsList from "./EventsList";
import type { components } from "../types";

// Mock vygenerovaného API klienta
vi.mock("../api", () => ({
    EventsService: {
        listEvents: vi.fn(),
        getEventById: vi.fn(),
        createEvent: vi.fn(),
    },
}));
import { EventsService } from "../api";

type Event = components["schemas"]["Event"];

const apiPayload = {
    items: [
        {
            id: 1,
            title: "Super akce",
            location: "Praha",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [
                        { name: "Honza", answer: "yes" },
                        { name: "Jana", answer: "no" },
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "Super akce 2",
            location: "Brno",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [{ name: "Jana", answer: "no" }],
                },
            ],
        },
    ] as Event[],
};

describe("EventsList component (API klient)", () => {
    beforeEach(() => {
        (EventsService.listEvents as unknown as jest.Mock).mockResolvedValue(
            apiPayload
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("načte a zobrazí tituly a lokace", async () => {
        render(
            <MemoryRouter>
                <EventsList />
            </MemoryRouter>
        );

        const items = await screen.findAllByRole("listitem");
        expect(items).toHaveLength(2);

        const r1 = within(items[0]);
        expect(r1.getByText(/super akce/i)).toBeInTheDocument();
        expect(r1.getByText(/praha/i)).toBeInTheDocument();

        const r2 = within(items[1]);
        expect(r2.getByText(/super akce 2/i)).toBeInTheDocument();
        expect(r2.getByText(/brno/i)).toBeInTheDocument();
    });

    it("vykreslí odkazy na detail", async () => {
        render(
            <MemoryRouter>
                <EventsList />
            </MemoryRouter>
        );

        const items = await screen.findAllByRole("listitem");
        const link1 = within(items[0]).getByRole("link");
        const link2 = within(items[1]).getByRole("link");

        expect(link1).toHaveAttribute("href", "/events/1");
        expect(link1).toHaveTextContent(/super akce/i);
        expect(link1).toHaveTextContent(/praha/i);

        expect(link2).toHaveAttribute("href", "/events/2");
        expect(link2).toHaveTextContent(/super akce 2/i);
        expect(link2).toHaveTextContent(/brno/i);
    });
});
