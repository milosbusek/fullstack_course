import React from "react";
import { type DateRecord } from "../types";

type Props = {
    title: string;
    location?: string;
    dates: DateRecord[];
};

const Event: React.FC<Props> = ({ title, location, dates }) => {
    const users = Array.from(
        new Set(dates.flatMap((d) => d.records.map((r) => r.name)))
    );

    return (
        <div className="event">
            <h2>{title}</h2>

            {location && (
                <p>
                    Místo: <span>{location}</span>
                </p>
            )}

            {dates.length === 0 ? (
                <p>Žádné termíny nejsou k dispozici.</p>
            ) : (
                <table border={1}>
                    <thead>
                    <tr>
                        <th>Účastník</th>
                        {dates.map((d) => (
                            <th key={d.timestamp}>
                                {new Date(d.timestamp).toLocaleDateString("cs-CZ")}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user}>
                            <td>{user}</td>
                            {dates.map((d) => {
                                const rec = d.records.find((r) => r.name === user);
                                let symbol = "-";
                                if (rec?.answer === "yes") symbol = "\u2705"; // ✅
                                else if (rec?.answer === "no") symbol = "\u274C"; // ❌
                                return <td key={d.timestamp}>{symbol}</td>;
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Event;
