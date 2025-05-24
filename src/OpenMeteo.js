class OpenMeteo {
    static API_URL = "https://api.open-meteo.com/v1/forecast?";

    static VARS_CURRENT = [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "wind_speed_10m",
        "weather_code"
    ].join(',');

    static VARS_HOURLY = [
        "temperature_2m",
        "weather_code",
        "apparent_temperature",
        "cloud_cover",
        "relative_humidity_2m"
    ].join(',');

    static VARS_DAILY = [
        "sunrise",
        "sunset",
        "apparent_temperature_mean",
        "temperature_2m_min",
        "temperature_2m_max",
        "temperature_2m_mean",
        "weather_code",
        "rain_sum",
        "wind_speed_10m_mean"
    ].join(',');

    static urlparams(parameters) {
        return new URLSearchParams(parameters).toString();
    }

    static async get_current(lat, lon, tempUnit="celsius") {
        let url = this.API_URL + 
            this.urlparams( {latitude: lat, longitude: lon, timezone: "GMT+2", temperature_unit: tempUnit} ) + `&current=${this.VARS_CURRENT}&daily=${this.VARS_DAILY}`;
        let res = await fetch(url);
        if (!res.ok) alert("Hibás lekérdezés!");
        return (await res.json());
    }

    static async get_hourly(lat, lon, forecastDays=3, pastDays=0, tempUnit="celsius") {
        let url = this.API_URL + 
            this.urlparams( {latitude: lat, longitude: lon, timezone: "GMT+2", temperature_unit: tempUnit} ) + `&hourly=${this.VARS_HOURLY}&forecast_days=${forecastDays}&past_days=${pastDays}`;
        let res = await fetch(url);
        if (!res.ok) alert("Hibás lekérdezés!");
        
        let json = await res.json();
        let hourly = {};
        for (let i = 0; i < json.hourly.time.length; i++) {
            if (new Date(json.hourly.time[i]).getTime() < Date.now() - 3600000) {
                continue;
            }
            hourly[json.hourly.time[i]] = {
                temperature_2m: json.hourly.temperature_2m[i],
                apparent_temperature: json.hourly.apparent_temperature[i],
                weather_code: json.hourly.weather_code[i],
                cloud_cover: json.hourly.cloud_cover[i],
                relative_humidity_2m: json.hourly.relative_humidity_2m[i],
                unit_temperature_2m: json.hourly_units.temperature_2m,
                unit_apparent_temperature: json.hourly_units.apparent_temperature,
            };
        }

        hourly = Object.keys(hourly).slice(0, 49).reduce((obj, key) => {
            obj[key] = hourly[key];
            return obj;
        }, {});

        return hourly;
    }

    static async get_daily(lat, lon, forecastDays=3, tempUnit="celsius") {
        let url = this.API_URL + 
            this.urlparams( {latitude: lat, longitude: lon, timezone: "GMT+2", forecast_days: forecastDays, temperature_unit: tempUnit} ) + `&daily=${this.VARS_DAILY}`;
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