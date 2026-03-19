import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWeatherData, fetchWeatherByCoords } from '../api/weatherService';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEY = 'weather_last_city';

const cache = new Map();

const getCached = (key) => {
    const entry = cache.get(key.toLowerCase());
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
        cache.delete(key.toLowerCase());
        return null;
    }
    return entry.data;
};

const setCache = (key, data) => {
    cache.set(key.toLowerCase(), { data, timestamp: Date.now() });
};

const useWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMetric, setIsMetric] = useState(() => {
        const saved = localStorage.getItem('weather_unit');
        return saved !== null ? saved === 'metric' : true;
    });
    const initialLoadDone = useRef(false);

    const searchCity = useCallback(async (city) => {
        if (!city?.trim()) return;
        const trimmed = city.trim();
        setLoading(true);
        setError(null);

        const cached = getCached(trimmed);
        if (cached) {
            setWeatherData(cached);
            setLoading(false);
            localStorage.setItem(STORAGE_KEY, trimmed);
            return;
        }

        try {
            const data = await fetchWeatherData(trimmed);
            setWeatherData(data);
            setCache(trimmed, data);
            localStorage.setItem(STORAGE_KEY, trimmed);
        } catch (err) {
            if (err.response?.status === 404) {
                setError({
                    type: 'not-found',
                    message: `"${trimmed}" not found. Check city name.`,
                });
            } else if (!navigator.onLine || err.code === 'ERR_NETWORK') {
                setError({
                    type: 'network',
                    message: 'No internet connection. Check your network.',
                });
            } else {
                setError({ type: 'generic', message: 'Failed to fetch weather data. Try again.' });
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const searchByLocation = useCallback(async () => {
        if (!navigator.geolocation) {
            setError({ type: 'geo', message: 'Geolocation not supported by your browser.' });
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude);
                    setWeatherData(data);
                    const cityName = data.current?.name || '';
                    if (cityName) {
                        setCache(cityName, data);
                        localStorage.setItem(STORAGE_KEY, cityName);
                    }
                } catch {
                    setError({
                        type: 'generic',
                        message: 'Failed to fetch weather for your location.',
                    });
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError({
                    type: 'geo',
                    message: 'Location access denied. Search a city instead.',
                });
                setLoading(false);
            },
            { timeout: 10000 },
        );
    }, []);

    const toggleUnit = useCallback(() => {
        setIsMetric((prev) => {
            const next = !prev;
            localStorage.setItem('weather_unit', next ? 'metric' : 'imperial');
            return next;
        });
    }, []);

    // Initial load: try last city from localStorage, fallback to geolocation, then Hanoi
    useEffect(() => {
        if (initialLoadDone.current) return;
        initialLoadDone.current = true;

        const lastCity = localStorage.getItem(STORAGE_KEY);
        if (lastCity) {
            searchCity(lastCity);
        } else {
            searchCity('Hanoi');
        }
    }, [searchCity]);

    return {
        weatherData,
        loading,
        error,
        isMetric,
        searchCity,
        searchByLocation,
        toggleUnit,
    };
};

export default useWeather;
