import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NewEvent from "./NewEvent";
import { data } from "../data/mockData";

describe("NewEvent component", () => {
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
            screen.getByRole("button", { name: /přidat událost/i })
        ).toBeInTheDocument();
    });

    it("should add a new event on form submit", async () => {
        render(
            <MemoryRouter>
                <NewEvent />
            </MemoryRouter>
        );

        const titleInput = screen.getByPlaceholderText("Zadejte název události");
        const locationInput = screen.getByPlaceholderText("Zadejte místo");
        const submitButton = screen.getByRole("button", { name: /přidat událost/i });

        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, "Testovaci udalost");
        await userEvent.type(locationInput, "Brno");
        await userEvent.click(submitButton);

        const newEvent = data.find((e) => e.title === "Testovaci udalost");
        expect(newEvent).toBeDefined();
        expect(newEvent?.location).toBe("Brno");
    });
});
