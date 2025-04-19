const dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
const monthNames = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]

const iconOfWMO = (WMO) => {
    switch(WMO) {
        case 0: return "☀️"; // Clear sky
        case 1: return "🌤️"; // Mainly clear
        case 2: return "🌥️"; // Partly cloudy
        case 3: return "☁️"; // Overcast
        case 45: return "🌫️"; // Fog
        case 48: return "🌫️"; // Depositing rime fog
        case 51: return "🌧️"; // Drizzle: Light
        case 53: return "🌧️"; // Drizzle: Moderate
        case 55: return "🌧️"; // Drizzle: Dense
        case 61: return "🌦️"; // Rain: Slight
        case 63: return "🌧️"; // Rain: Moderate
        case 65: return "🌧️"; // Rain: Heavy
        case 66: return "🌧️"; // Freezing rain: Light
        case 67: return "🌧️"; // Freezing rain: Heavy
        case 71: return "🌨️"; // Snow fall: Slight
        case 73: return "🌨️"; // Snow fall: Moderate
        case 75: return "🌨️"; // Snow fall: Heavy
        case 77: return "🌨️"; // Snow grains
        case 80: return "🌧️"; // Rain showers: Slight
        case 81: return "🌧️"; // Rain showers: Moderate
        case 82: return "🌧️"; // Rain showers: Violent
        case 85: return "🌨️"; // Snow showers: Slight
        case 86: return "🌨️"; // Snow showers: Heavy
        case 95: return "⛈️"; // Thunderstorm: Slight or moderate
        case 96: return "⛈️"; // Thunderstorm with slight hail
        case 99: return "⛈️"; // Thunderstorm with heavy hail
        default: return "❓"; // Unknown
    }
}

const updateCurrentCard = async (cityName, coords) => {
    const flagEmoji = localStorage.getItem("countryCode")
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
    document.getElementById("nowLocation").textContent = cityName + " " + flagEmoji;
    let date = new Date();
    document.getElementById("nowDate").textContent = `${date.getFullYear()}. ${monthNames[date.getMonth()]} ${date.getDate()}., ${dayNames[date.getUTCDay()]}`;

    const data = await OpenMeteo.get_current(...coords);
    console.log(data);
    document.getElementById("nowIcon").textContent = iconOfWMO(data.current.weather_code);
    document.getElementById("nowTemperature").textContent = data.current.temperature_2m.toString() + data.current_units.temperature_2m;
    document.getElementById("nowFeelTemperature").textContent = data.current.apparent_temperature.toString() + data.current_units.apparent_temperature;
    document.getElementById("nowWind").textContent = data.current.wind_speed_10m + " " + data.current_units.wind_speed_10m;
    document.getElementById("nowHumidity").textContent = data.current.relative_humidity_2m + "%"
    let sunrise = new Date(data.daily.sunrise[0]);
    let sunset = new Date(data.daily.sunset[0]);
    document.getElementById("nowSunrise").textContent = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
    document.getElementById("nowSunset").textContent = `${sunset.getHours()}:${sunset.getMinutes()}`;
}