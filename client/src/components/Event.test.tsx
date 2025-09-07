import { render, screen } from "@testing-library/react";
import Event from "./Event";
import { DateRecord } from "../types";

test("Event zobrazí odkaz s titulkem a lokací", () => {
    const dates: DateRecord[] = [{ timestamp: Date.now(), records: [] }];
    render(
        <ul>
            <Event id={1} title="Super akce" location="Praha" dates={dates} />
        </ul>
    );

    const link = screen.getByRole("link", { name: /super akce/i });
    expect(link).toHaveAttribute("href", "/events/1");
    expect(link).toHaveTextContent(/praha/i);
});
