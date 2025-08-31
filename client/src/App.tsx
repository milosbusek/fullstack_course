import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetail";
import NewEvent from "./components/NewEvent";
import { data } from "./data/mockData";

const App: React.FC = () => {
    return (
        <div style={{ padding: 12 }}>
            {/* jednoduché menu dostupné na všech stránkách */}
            <nav style={{ marginBottom: 16 }}>
                <Link to="/events" style={{ marginRight: 12 }}>Seznam událostí</Link>
                <Link to="/events/new">Přidat událost</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Navigate to="/events" replace />} />
                <Route path="/events" element={<EventsList data={data} />} />
                <Route path="/events/new" element={<NewEvent />} />
                <Route path="/events/:id" element={<EventDetail />} />
                {/* fallback */}
                <Route path="*" element={<p>Stránka nenalezena.</p>} />
            </Routes>
        </div>
    );
};

export default App;
