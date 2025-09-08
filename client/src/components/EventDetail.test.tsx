import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EventDetail from "./EventDetail";

const apiEvent = {
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

describe("EventDetail component (API Klient)", () => {
    beforeEach(() => {
        vi.stubGlobal(
            "fetch",
            vi.fn(async () => ({
                ok: true,
                json: async () => apiEvent,
            })) as unknown as typeof fetch
        );
    });

    afterEach(() => {
        (fetch as unknown as { mockRestore?: () => void }).mockRestore?.();
    });

    it("vykreslí detaily události", async () => {
        render(
            <MemoryRouter initialEntries={["/events/1"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/super akce/i)).toBeInTheDocument();
        expect(await screen.findByText(/místo:\s*praha/i)).toBeInTheDocument();
    });
});
