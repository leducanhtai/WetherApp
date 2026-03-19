import axios from 'axios';
import {
    fetchWeatherData,
    fetchWeatherByCoords,
    fetchCitySuggestions,
} from '../api/weatherService';

jest.mock('axios');

describe('weatherService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchWeatherData', () => {
        it('calls the correct endpoints and returns combined data', async () => {
            const currentData = {
                coord: { lat: 51.5, lon: -0.12 },
                name: 'London',
            };
            const forecastData = { list: [] };
            const airData = { list: [] };

            axios.get
                .mockResolvedValueOnce({ data: currentData })
                .mockResolvedValueOnce({ data: forecastData })
                .mockResolvedValueOnce({ data: airData });

            const result = await fetchWeatherData('London');

            expect(result).toEqual({
                current: currentData,
                forecast: forecastData,
                airQuality: airData,
            });
            expect(axios.get).toHaveBeenCalledTimes(3);
        });
    });

    describe('fetchWeatherByCoords', () => {
        it('fetches weather using coordinates', async () => {
            const currentData = {
                coord: { lat: 51.5, lon: -0.12 },
            };

            axios.get
                .mockResolvedValueOnce({ data: currentData })
                .mockResolvedValueOnce({ data: { list: [] } })
                .mockResolvedValueOnce({ data: { list: [] } });

            const result = await fetchWeatherByCoords(51.5, -0.12);
            expect(result.current).toEqual(currentData);
        });
    });

    describe('fetchCitySuggestions', () => {
        it('returns empty array for short queries', async () => {
            const result = await fetchCitySuggestions('a');
            expect(result).toEqual([]);
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('returns formatted suggestions', async () => {
            axios.get.mockResolvedValueOnce({
                data: [
                    { name: 'London', country: 'GB', state: 'England', lat: 51.5, lon: -0.12 },
                    { name: 'Londonderry', country: 'GB', lat: 54.99, lon: -7.31 },
                ],
            });

            const result = await fetchCitySuggestions('London');

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                name: 'London',
                country: 'GB',
                state: 'England',
                lat: 51.5,
                lon: -0.12,
            });
            expect(result[1].state).toBe('');
        });
    });
});
