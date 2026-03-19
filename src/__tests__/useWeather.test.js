import { renderHook, act, waitFor } from '@testing-library/react';
import useWeather from '../hooks/useWeather';
import * as weatherService from '../api/weatherService';

jest.mock('../api/weatherService');

const mockWeatherData = {
    current: {
        name: 'London',
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        main: { temp: 20, feels_like: 18, humidity: 55, pressure: 1013 },
        visibility: 10000,
        wind: { speed: 5, deg: 180 },
        sys: { sunrise: 1000000, sunset: 1040000, country: 'GB' },
        coord: { lat: 51.5, lon: -0.12 },
    },
    forecast: {
        list: Array.from({ length: 40 }, (_, i) => ({
            dt: Math.floor(Date.now() / 1000) + i * 10800,
            dt_txt: `2025-01-01 ${String((i * 3) % 24).padStart(2, '0')}:00:00`,
            main: { temp: 20 + i, humidity: 50 },
            weather: [{ main: 'Clear', icon: '01d', description: 'clear sky' }],
            wind: { speed: 5 },
        })),
        city: { name: 'London' },
    },
    airQuality: {
        list: [{ main: { aqi: 2 }, components: { pm2_5: 12 } }],
    },
};

describe('useWeather', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        weatherService.fetchWeatherData.mockResolvedValue(mockWeatherData);
        weatherService.fetchWeatherByCoords.mockResolvedValue(mockWeatherData);
    });

    it('loads weather data on mount using default city', async () => {
        const { result } = renderHook(() => useWeather());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.weatherData).toEqual(mockWeatherData);
        expect(weatherService.fetchWeatherData).toHaveBeenCalledWith('Hanoi');
    });

    it('uses last city from localStorage on mount', async () => {
        localStorage.setItem('weather_last_city', 'Tokyo');
        const { result } = renderHook(() => useWeather());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(weatherService.fetchWeatherData).toHaveBeenCalledWith('Tokyo');
    });

    it('searchCity updates weather data', async () => {
        const { result } = renderHook(() => useWeather());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        await act(async () => {
            await result.current.searchCity('Paris');
        });

        expect(weatherService.fetchWeatherData).toHaveBeenCalledWith('Paris');
        expect(result.current.weatherData).toEqual(mockWeatherData);
    });

    it('sets not-found error for 404 response', async () => {
        const { result } = renderHook(() => useWeather());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Now reject the next call
        weatherService.fetchWeatherData.mockRejectedValueOnce({
            response: { status: 404 },
        });

        await act(async () => {
            await result.current.searchCity('InvalidCity');
        });

        expect(result.current.error).toMatchObject({
            type: 'not-found',
        });
    });

    it('toggleUnit switches between metric and imperial', async () => {
        const { result } = renderHook(() => useWeather());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.isMetric).toBe(true);

        act(() => {
            result.current.toggleUnit();
        });

        expect(result.current.isMetric).toBe(false);
        expect(localStorage.getItem('weather_unit')).toBe('imperial');
    });

    it('ignores empty city search', async () => {
        const { result } = renderHook(() => useWeather());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        jest.clearAllMocks();

        await act(async () => {
            await result.current.searchCity('');
        });

        expect(weatherService.fetchWeatherData).not.toHaveBeenCalled();
    });
});
