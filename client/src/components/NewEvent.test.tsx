import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NewEvent from "./NewEvent";

describe("NewEvent component (API)", () => {
    afterEach(() => {
        (fetch as unknown as { mockRestore?: () => void }).mockRestore?.();
    });

    it("renders form fields", () => {
        render(
            <MemoryRouter>
                <NewEvent />
            </MemoryRouter>
        );

        expect(
            screen.getByPlaceholderText("Zadejte název události")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Zadejte místo")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Přidat datum/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Přidat událost/i })
        ).toBeInTheDocument();
    });

    it("POSTs payload and shows error on failure", async () => {
        const user = userEvent.setup();

        vi.stubGlobal(
            "fetch",
            vi.fn(async (url: RequestInfo, init?: RequestInit) => {
                if (String(url).endsWith("/api/events") && init?.method === "POST") {
                    return { ok: false, status: 500 } as unknown as Response;
                }
                return { ok: false, status: 404 } as unknown as Response;
            }) as unknown as typeof fetch
        );

        render(
            <MemoryRouter>
                <NewEvent />
            </MemoryRouter>
        );

        await user.type(
            screen.getByPlaceholderText("Zadejte název události"),
            "Testovaci udalost"
        );
        await user.type(screen.getByPlaceholderText("Zadejte místo"), "Brno");

        // přidej jeden datum
        await user.click(screen.getByRole("button", { name: /Přidat datum/i }));
        const dateInput = document.querySelector(
            'input[type="datetime-local"]'
        ) as HTMLInputElement;
        if (dateInput) {
            dateInput.value = "2025-09-16T12:00";
            dateInput.dispatchEvent(new Event("input", { bubbles: true }));
            dateInput.dispatchEvent(new Event("change", { bubbles: true }));
        }

        await user.click(screen.getByRole("button", { name: /Přidat událost/i }));

        expect(fetch).toHaveBeenCalledTimes(1);
        const [, init] = (fetch as unknown as jest.Mock).mock.calls[0];
        expect((init as RequestInit).method).toBe("POST");
        expect((init as RequestInit).headers).toEqual(
            expect.objectContaining({ "Content-Type": "application/json" })
        );

        expect(
            await screen.findByText(/odeslání selhalo/i)
        ).toBeInTheDocument();
    });
});
