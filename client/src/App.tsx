// client/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetail from "./components/EventDetail";
import NewEvent from "./components/NewEvent";

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ padding: 12 }}>
                {/* jednoduché menu dostupné na všech stránkách */}
                <nav style={{ marginBottom: 16 }}>
                    <Link to="/events" style={{ marginRight: 12 }}>Seznam událostí</Link>
                    <Link to="/events/new">Přidat událost</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Navigate to="/events" replace />} />
                    <Route path="/events" element={<EventsList />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/events/new" element={<NewEvent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
