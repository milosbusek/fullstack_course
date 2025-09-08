
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NewEvent from "./NewEvent";

describe("NewEvent component (API)", () => {
    const user = userEvent.setup();

    beforeEach(() => {
        vi.stubGlobal(
            "fetch",
            vi.fn(async () => ({
                ok: true,
                json: async () => ({}),
            })) as unknown as typeof fetch
        );
    });

    afterEach(() => {
        (fetch as unknown as { mockRestore?: () => void }).mockRestore?.();
    });

    it("POSTs payload", async () => {
        render(
            <MemoryRouter>
                <NewEvent />
            </MemoryRouter>
        );

        await user.type(
            screen.getByPlaceholderText(/název akce/i),
            "test"
        );
        await user.type(screen.getByPlaceholderText(/místo/i), "Praha");

        await user.click(
            screen.getByRole("button", { name: /přidat událost/i })
        );

        expect(fetch).toHaveBeenCalledTimes(1);
        const [, init] = (fetch as unknown as jest.Mock).mock.calls[0];
        expect((init as RequestInit).method).toBe("POST");
    });
});
