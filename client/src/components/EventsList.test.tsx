import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventsList from "./EventsList";

const apiPayload = {
    items: [
        {
            id: 1,
            location: "Praha",
            title: "Super akce",
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
            location: "Brno",
            title: "Super akce 2",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [{ name: "Jana", answer: "no" }],
                },
            ],
        },
    ],
};

describe("EventsList component (API)", () => {
    beforeEach(() => {
        vi.stubGlobal(
            "fetch",
            vi.fn(async () => ({
                ok: true,
                json: async () => apiPayload,
            })) as unknown as typeof fetch
        );
    });

    afterEach(() => {
        (fetch as unknown as { mockRestore?: () => void }).mockRestore?.();
    });

    it("načte a zobrazí tituly a lokace", async () => {
        render(
            <MemoryRouter>
                <EventsList />
            </MemoryRouter>
        );

        const items = await screen.findAllByRole("listitem");
        expect(items).toHaveLength(2);

        expect(items[0]).toHaveTextContent(/super akce/i);
        expect(items[0]).toHaveTextContent(/praha/i);

        expect(items[1]).toHaveTextContent(/super akce 2/i);
        expect(items[1]).toHaveTextContent(/brno/i);
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
