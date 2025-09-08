import type { Event } from "./eventTypes";

export const mockEvents: Event[] = [
    {
        id: 1,
        title: "Super akce",
        location: "Praha",
        dates: [
            {
                timestamp: Date.now(),
                records: [
                    { name: "Honza", answer: "yes" },
                    { name: "Jana", answer: "no" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Super akce 2",
        location: "Brno",
        dates: [
            {
                timestamp: Date.now(),
                records: [{ name: "Jana", answer: "no" }]
            }
        ]
    }
];
