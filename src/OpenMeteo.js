class OpenMeteo {
    static API_URL = "https://api.open-meteo.com/v1/forecast?";

    static VARS_CURRENT = [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "wind_speed_10m",
        "weather_code"
    ].join(',');

    static VARS_DAILY = [
        "sunrise",
        "sunset"
    ].join(',');

    static urlparams(parameters) {
        return new URLSearchParams(parameters).toString();
    }

    static async get_current(lat, lon) {
        let url = this.API_URL + 
            this.urlparams( {latitude: lat, longitude: lon, timezone: "GMT+2"} ) + `&current=${this.VARS_CURRENT}&daily=${this.VARS_DAILY}`;
        let res = await fetch(url);
        if (!res.ok) alert("Hibás lekérdezés!");
        return (await res.json());
    }

    static async fetchSuggestions(query) {
        let url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}`;
        let res = await fetch(url);
        if (!res.ok) alert("Hibás lekérdezés!");
        let json = await res.json();
        if (!json.results) {
            return {
                results: []
            };
        }
        return json;
    }
}