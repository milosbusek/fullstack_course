import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NewEvent from "./NewEvent";
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

type EventInput = components["schemas"]["EventInput"];

describe("NewEvent component (API klient)", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("POSTs payload a po úspěchu přesměruje", async () => {
        (EventsService.createEvent as unknown as jest.Mock).mockResolvedValue({
            id: 99,
            title: "test",
            location: "Kdyně",
            dates: [],
        });

        // EventsList mock, aby byla cílová stránka po redirectu
        (EventsService.listEvents as unknown as jest.Mock).mockResolvedValue({
            items: [],
        });

        render(
            <MemoryRouter initialEntries={["/events/new"]}>
                <Routes>
                    <Route path="/events" element={<EventsList />} />
                    <Route path="/events/new" element={<NewEvent />} />
                </Routes>
            </MemoryRouter>
        );

        await userEvent.type(
            screen.getByRole("textbox", { name: /název/i }),
            "test"
        );
        await userEvent.type(screen.getByRole("textbox", { name: /místo/i }), "Kdyně");
        await userEvent.click(screen.getByRole("button", { name: /přidat událost/i }));

        expect(EventsService.createEvent).toHaveBeenCalledTimes(1);
        const payload = (EventsService.createEvent as unknown as jest.Mock).mock
            .calls[0][0] as EventInput;
        expect(payload.title).toBe("test");
        expect(payload.location).toBe("Kdyně");
    });
});
