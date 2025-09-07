import { useState } from "react";
import { getCoordinates } from "../utils/getCoordinates";

type WeatherState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "success"; tempNowC: number; source: string };

export function useWeather() {
    const [state, setState] = useState<WeatherState>({ status: "idle" });

    async function getWeather(location?: string) {
        if (!location) {
            setState({ status: "error", error: "Neznámá lokalita" });
            return;
        }
        setState({ status: "loading" });

        try {
            const coords = await getCoordinates(location);
            if (!coords) {
                setState({ status: "error", error: "Neznámá lokalita" });
                return;
            }

            const url =
                "https://api.open-meteo.com/v1/forecast?latitude=" +
                coords.lat +
                "&longitude=" +
                coords.lon +
                "&hourly=temperature_2m&forecast_days=1&timezone=auto";

            const r = await fetch(url);
            if (!r.ok) {
                setState({ status: "error", error: "Chyba počasí" });
                return;
            }
            const j = await r.json();
            const temps: number[] = j?.hourly?.temperature_2m ?? [];
            const tempNowC = temps.length ? temps[temps.length - 1] : NaN;
            setState({ status: "success", tempNowC, source: "open-meteo.com" });
        } catch (e) {
            setState({ status: "error", error: String(e) });
        }
    }

    return { state, getWeather };
}
