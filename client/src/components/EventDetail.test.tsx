import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetail from "./EventDetail";
import { data } from "../data/mockData";

describe("EventDetail component", () => {
    it("zobrazí detaily události podle ID", () => {
        render(
            <MemoryRouter initialEntries={["/events/1"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        // Kontrola, že se zobrazí název a místo události
        expect(screen.getByText(/Detail události:/)).toBeInTheDocument();
        expect(screen.getByText(data[0].title)).toBeInTheDocument();
        const locations = screen.getAllByText(new RegExp(`^Místo:\\s*${data[0].location}$`));
        expect(locations).toHaveLength(2);
    });

    it("zobrazí hlášku, když událost neexistuje", () => {
        render(
            <MemoryRouter initialEntries={["/events/999"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Událost nebyla nalezena/)).toBeInTheDocument();
    });
});
