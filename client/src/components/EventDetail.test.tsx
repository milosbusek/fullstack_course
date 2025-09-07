import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetail from "./EventDetail";
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

const eventDetail: Event = {
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
};

describe("EventDetail component (API klient)", () => {
    beforeEach(() => {
        (EventsService.getEventById as unknown as jest.Mock).mockResolvedValue(
            eventDetail
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("loads detail from API and renders", async () => {
        render(
            <MemoryRouter initialEntries={["/events/1"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/detail události/i)).toBeInTheDocument();
        expect(await screen.findByText(/praha/i)).toBeInTheDocument();
        expect(await screen.findByText(/super akce/i)).toBeInTheDocument();
    });
});
