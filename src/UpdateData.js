const dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
const monthNames = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]

const iconOfWMO = (WMO) => {
    switch(WMO) {
        case 0:
            return "☀️";
        case 1:
            return "🌤️";
        case 2:
            return "⛅";
        case 3:
            return "🌥️";
        case 45:
        case 48:
            return "🌫️";
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            return "🌧️";
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "🌨️";
        case 95:
        case 96:
        case 99:
            return "⛈️";
        default:
            return "☁️"
    }
}

const updateCurrentCard = async (cityName, coords) => {
    document.getElementById("nowLocation").textContent = cityName;
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