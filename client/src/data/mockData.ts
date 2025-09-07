import type { components } from "../types.d";

type Event = components["schemas"]["Event"];

export const data: Event[] = [
    {
        id: 1,
        title: "Super akce",
        location: "Praha",
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: "Honza", answer: "yes" },
                    { name: "Jana", answer: "no" },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Super akce 2",
        location: "Brno",
        dates: [
            {
                timestamp: 1726514405258,
                records: [{ name: "Jana", answer: "no" }],
            },
        ],
    },
];
