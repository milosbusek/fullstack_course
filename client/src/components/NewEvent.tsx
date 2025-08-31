import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../data/mockData";
import { type PollingEvent } from "../types";

const NewEvent: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !location) return;

        const newEvent: PollingEvent = {
            id: String(Date.now()),
            title,
            location,
            dates: [],
        };

        data.push(newEvent);
        navigate(`/events/${newEvent.id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Název události:
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Zadejte název události"
                    />
                </label>
            </div>
            <div>
                <label>
                    Místo:
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Zadejte místo"
                    />
                </label>
            </div>
            <button type="submit">Přidat událost</button>
        </form>
    );
};

export default NewEvent;
