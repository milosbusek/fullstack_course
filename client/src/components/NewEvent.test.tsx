import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import NewEvent from "./NewEvent";

describe("NewEvent component", () => {
    beforeEach(() => {
        global.fetch = vi.fn(async () => ({
            ok: false,
            status: 500,
            json: async () => ({}),
        })) as unknown as typeof fetch;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render the form fields correctly", () => {
        render(
            <MemoryRouter>
                <NewEvent />
            </MemoryRouter>
        );

        expect(
            screen.getByPlaceholderText("Zadejte název události")
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Zadejte místo")
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /přidat datum/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /přidat událost/i })
        ).toBeInTheDocument();
    });

    it("should POST payload and show error on failure", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <NewEvent />
            </MemoryRouter>
        );

        await user.type(
            screen.getByPlaceholderText("Zadejte název události"),
            "Testovaci udalost"
        );
        await user.type(
            screen.getByPlaceholderText("Zadejte místo"),
            "Brno"
        );

        await user.click(screen.getByRole("button", { name: /přidat datum/i }));

        const dateInput = document.querySelector(
            'input[type="datetime-local"]'
        ) as HTMLInputElement;

        const iso = "2025-09-16T12:00";
        if (dateInput) {
            dateInput.value = iso;
            dateInput.dispatchEvent(
                new Event("input", { bubbles: true, cancelable: true })
            );
            dateInput.dispatchEvent(
                new Event("change", { bubbles: true, cancelable: true })
            );
        }

        await user.click(screen.getByRole("button", { name: /přidat událost/i }));

        expect(fetch).toHaveBeenCalledTimes(1);
        const [url, init] = (fetch as unknown as any).mock.calls[0];

        expect(url).toBe("/api/events");
        expect(init.method).toBe("POST");
        expect(init.headers).toEqual(
            expect.objectContaining({ "Content-Type": "application/json" })
        );

        const payload = JSON.parse(init.body as string);
        expect(payload.title).toBe("Testovaci udalost");
        expect(payload.location).toBe("Brno");
        expect(Array.isArray(payload.dates)).toBe(true);
        expect(payload.dates.length).toBe(1);

        const expectedTs = Date.parse(iso);
        expect(payload.dates[0]).toBe(expectedTs);

        expect(
            await screen.findByText(/Odeslání selhalo, server není dostupný/i)
        ).toBeInTheDocument();
    });
});
