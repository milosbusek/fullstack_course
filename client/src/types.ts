import type { components as OpenApiComponents } from "./types.d";

export type Event = OpenApiComponents["schemas"]["Event"];
export type DateRecord = OpenApiComponents["schemas"]["DateRecord"];
export type Vote = OpenApiComponents["schemas"]["Vote"];

export type EventsResponse = { items: Event[] };

export type NewEventPayload = {
    title: string;
    location?: string;
    dates: number[];
};
