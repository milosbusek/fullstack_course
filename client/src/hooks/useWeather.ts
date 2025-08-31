import { useEffect, useState } from "react";

type WeatherState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "success"; tempNowC: number; source: string };

type LatLon = { lat: number; lon: number };

// mapování názvů lokalit na souřadnice
const LOCATIONS: Record<string, LatLon> = {
    Praha: { lat: 50.0755, lon: 14.4378 },
    Plzeň: { lat: 49.7475, lon: 13.3776 },
    Brno: { lat: 49.1951, lon: 16.6068 },
};

export function useWeather(location?: string) {
    const [state, setState] = useState<WeatherState>({ status: "idle" });

    useEffect(() => {
        if (!location) return;
        const coords = LOCATIONS[location];
        if (!coords) {
            setState({ status: "error", error: "Neznámá lokalita" });
            return;
        }

        const { lat, lon } = coords;
        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${lat}&longitude=${lon}` +
            `&hourly=temperature_2m&forecast_days=1&timezone=auto`;

        let cancelled = false;
        setState({ status: "loading" });

        fetch(url)
            .then(async (r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const json = await r.json();
                const temps: number[] = json?.hourly?.temperature_2m ?? [];
                const tempNowC = temps.length ? temps[temps.length - 1] : NaN;
                if (!cancelled) {
                    setState({
                        status: "success",
                        tempNowC,
                        source: "open-meteo.com",
                    });
                }
            })
            .catch((e) => {
                if (!cancelled) setState({ status: "error", error: String(e) });
            });

        return () => {
            cancelled = true;
        };
    }, [location]);

    return state;
}
