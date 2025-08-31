import React from "react";
import { type DateRecord, type EventProps, type UserRecord } from "../types";

export const Event: React.FC<EventProps> = ({ location, title, dates }) => {
    // Získání unikátních jmen účastníků z dat
    const users: string[] = Array.from(
        new Set(dates.flatMap((d: DateRecord) => d.records.map((r: UserRecord) => r.name)))
    );

    return (
        <div className="event">
            <h2>{title}</h2>
            {location && <p>Místo: {location}</p>}
            {dates.length === 0 ? (
                <p>Žádné termíny nejsou k dispozici.</p>
            ) : (
                <table border={1}>
                    <thead>
                    <tr>
                        <th>Účastník</th>
                        {dates.map((d: DateRecord) => (
                            <th key={d.timestamp}>{new Date(d.timestamp).toLocaleDateString()}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: string) => (
                        <tr key={user}>
                            <td>{user}</td>
                            {dates.map((d: DateRecord) => {
                                const record = d.records.find((r: UserRecord) => r.name === user);
                                const answer = record?.answer;
                                let symbol: string = "-";
                                if (answer === "yes") symbol = "✅";
                                else if (answer === "no") symbol = "❌";
                                else if (answer === "if-needed") symbol = "❔";
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
