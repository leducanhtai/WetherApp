// src/api/weatherService.js
import axios from 'axios';

const API_KEY = '879a11448e53d007151ce69c2702ac4e'; // Các em nhớ thay bằng API key của mình nhé
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city) => {
    try {
        // 1. Fetch Current Weather
        const currentResponse = await axios.get(`${BASE_URL}/weather`, {
            params: { q: city, appid: API_KEY, units: 'metric' },
        });

        const { lat, lon } = currentResponse.data.coord;

        // 2. Fetch Forecast (5 days / 3 hour intervals)
        const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
            params: { q: city, appid: API_KEY, units: 'metric' },
        });

        // 3. Fetch Air Quality
        const airPollutionResponse = await axios.get(`${BASE_URL}/air_pollution`, {
            params: { lat, lon, appid: API_KEY },
        });

        return {
            current: currentResponse.data,
            forecast: forecastResponse.data,
            airQuality: airPollutionResponse.data,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
