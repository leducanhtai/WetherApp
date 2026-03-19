// src/api/weatherService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '879a11448e53d007151ce69c2702ac4e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

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
