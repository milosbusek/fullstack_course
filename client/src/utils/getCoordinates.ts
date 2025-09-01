export type LatLon = { lat: number; lon: number };

export async function getCoordinates(city: string): Promise<LatLon | null> {
    const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=1&language=cs&format=json";

    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    const first = j?.results?.[0];
    if (!first) return null;
    return { lat: first.latitude, lon: first.longitude };
}
