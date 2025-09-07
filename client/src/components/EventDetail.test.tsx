import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventDetail from "./EventDetail";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";

// Přetížení useParams tak, aby vracel id = "1"
vi.mock("react-router-dom", async (orig) => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
    };
});

const apiDetail = {
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
};

beforeEach(() => {
    vi.stubGlobal(
        "fetch",
        vi.fn(async () => ({
            ok: true,
            json: async () => apiDetail,
        })) as unknown as typeof fetch
    );
});

afterEach(() => {
    (fetch as unknown as { mockRestore?: () => void }).mockRestore?.();
});

describe("EventDetail component (API)", () => {
    it("načte detail a zobrazí titulek a lokaci", async () => {
        render(
            <MemoryRouter>
                <EventDetail />
            </MemoryRouter>
        );

        // místo getByText(/Super akce/i) použijeme přesný heading druhé úrovně
        expect(
            await screen.findByRole("heading", { level: 2, name: /^Super akce$/i })
        ).toBeInTheDocument();

        expect(await screen.findByText(/Místo:\s*Praha/)).toBeInTheDocument();
    });
});
