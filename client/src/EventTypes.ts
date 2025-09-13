import type { components } from "./types";

export type Event       = components["schemas"]["Event"];
export type DateRecord  = components["schemas"]["DateRecord"];
export type Vote        = components["schemas"]["Vote"];

export type EventsResponse = { items: Event[] };

export type NewEventPayload = {
    title: string;
    location?: string;
    dates: number[];
};
