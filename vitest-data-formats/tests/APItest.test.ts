import { describe, it, expect } from 'vitest';

async function fetchApiResponse(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset&timezone=GMT`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('API hiba');
  return await res.json();
}

function isValidApiResponse(data: any): boolean {
  return (
    typeof data === 'object' &&
    typeof data.current === 'object' &&
    typeof data.current.weather_code === 'number' &&
    typeof data.current.temperature_2m === 'number' &&
    typeof data.current.apparent_temperature === 'number' &&
    typeof data.current.wind_speed_10m === 'number' &&
    typeof data.current.relative_humidity_2m === 'number' &&
    typeof data.current_units === 'object' &&
    typeof data.current_units.temperature_2m === 'string' &&
    typeof data.current_units.apparent_temperature === 'string' &&
    typeof data.current_units.wind_speed_10m === 'string' &&
    typeof data.daily === 'object' &&
    Array.isArray(data.daily.sunrise) &&
    Array.isArray(data.daily.sunset)
  );
}

describe('OpenMeteo API formátuma', () => {
  it('helyes szerkezetű', async () => {
    const data = await fetchApiResponse(47.4979, 19.0402); // Budapest
    expect(isValidApiResponse(data)).toBe(true);
  });

  it('helyes szerkezetű', async () => {
    const data = await fetchApiResponse(51.5074, -0.1278); // London
    expect(isValidApiResponse(data)).toBe(true);
  });

  it('helyes szerkezetű', async () => {
    const data = await fetchApiResponse(40.7128, -74.0060); // New York
    expect(isValidApiResponse(data)).toBe(true);
  });

  it('helyes szerkezetű', async () => {
    const data = await fetchApiResponse(35.6895, 139.6917); // Tokyo
    expect(isValidApiResponse(data)).toBe(true);
  });

  it('helyes szerkezetű', async () => {
    const data = await fetchApiResponse(-33.8688, 151.2093); // Sydney
    expect(isValidApiResponse(data)).toBe(true);
  });
});