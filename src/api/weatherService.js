// src/api/weatherService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

if (!API_KEY) {
    console.error('Missing REACT_APP_WEATHER_API_KEY. Create a .env file in the project root.');
}

const fetchAllWeatherData = async (currentParams) => {
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
        params: { ...currentParams, appid: API_KEY, units: 'metric' },
    });

    const { lat, lon } = currentResponse.data.coord;

    const [forecastResponse, airPollutionResponse] = await Promise.all([
        axios.get(`${BASE_URL}/forecast`, {
            params: { lat, lon, appid: API_KEY, units: 'metric' },
        }),
        axios.get(`${BASE_URL}/air_pollution`, {
            params: { lat, lon, appid: API_KEY },
        }),
    ]);

    return {
        current: currentResponse.data,
        forecast: forecastResponse.data,
        airQuality: airPollutionResponse.data,
    };
};

export const fetchWeatherData = async (city) => {
    return fetchAllWeatherData({ q: city });
};

export const fetchWeatherByCoords = async (lat, lon) => {
    return fetchAllWeatherData({ lat, lon });
};

export const fetchCitySuggestions = async (query) => {
    if (!query || query.length < 2) return [];
    const response = await axios.get(`${GEO_URL}/direct`, {
        params: { q: query, limit: 5, appid: API_KEY },
    });
    return response.data.map((item) => ({
        name: item.name,
        country: item.country,
        state: item.state || '',
        lat: item.lat,
        lon: item.lon,
    }));
};
