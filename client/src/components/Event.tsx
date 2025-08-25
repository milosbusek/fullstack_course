import React from "react";

export type UserRecord = {
    name: string;
    answer: "yes" | "no" | "if-needed";
};

export type DateRecord = {
    timestamp: number;
    records: UserRecord[];
};

export type EventProps = {
    location?: string;
    id: string;
    title: string;
    dates: DateRecord[];
};

const getAnswerSymbol = (answer: UserRecord["answer"]) => {
    switch (answer) {
        case "yes":
            return "✅";
        case "no":
            return "❌";
        case "if-needed":
            return "❔";
        default:
            return "-";
    }
};

export const Event: React.FC<EventProps> = ({ location, title, dates }) => {
    const users = Array.from(new Set(dates.flatMap((d) => d.records.map((r) => r.name))));

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
                        {dates.map((d) => (
                            <th key={d.timestamp}>
                                {new Date(d.timestamp).toLocaleDateString()}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user}>
                            <td>{user}</td>
                            {dates.map((d) => {
                                const record = d.records.find((r) => r.name === user);
                                return (
                                    <td key={d.timestamp}>
                                        {record ? getAnswerSymbol(record.answer) : "-"}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};