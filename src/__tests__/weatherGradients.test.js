import { getWeatherGradient, getAirQualityGradient } from '../utils/weatherGradients';

describe('getWeatherGradient', () => {
    it('returns correct gradient for known weather types', () => {
        expect(getWeatherGradient('Clear')).toContain('#f59e0b');
        expect(getWeatherGradient('Rain')).toContain('#1e3c72');
        expect(getWeatherGradient('Snow')).toContain('#e6dada');
    });

    it('returns Clouds gradient as fallback for unknown types', () => {
        const fallback = getWeatherGradient('Clouds');
        expect(getWeatherGradient('UnknownWeather')).toBe(fallback);
    });
});

describe('getAirQualityGradient', () => {
    it('returns correct gradient for known weather types', () => {
        expect(getAirQualityGradient('Clear')).toContain('#4a8aaa');
        expect(getAirQualityGradient('Rain')).toContain('#3a5a7a');
    });

    it('returns Clouds gradient as fallback for unknown types', () => {
        const fallback = getAirQualityGradient('Clouds');
        expect(getAirQualityGradient('UnknownWeather')).toBe(fallback);
    });
});
