import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../components/CurrentWeather';

const mockData = {
    main: {
        temp: 25,
        feels_like: 27,
        pressure: 1013,
        humidity: 65,
    },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    visibility: 10000,
};

// Mock WeatherAnimation to avoid complex rendering
jest.mock('../components/WeatherAnimation', () => {
    return function MockWeatherAnimation() {
        return <div data-testid="weather-animation" />;
    };
});

describe('CurrentWeather', () => {
    it('renders nothing when data is null', () => {
        const { container } = render(<CurrentWeather data={null} isMetric={true} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders temperature in Celsius', () => {
        render(<CurrentWeather data={mockData} isMetric={true} />);
        expect(screen.getByText(/25°C/)).toBeInTheDocument();
    });

    it('renders temperature in Fahrenheit', () => {
        render(<CurrentWeather data={mockData} isMetric={false} />);
        expect(screen.getByText(/77°F/)).toBeInTheDocument();
    });

    it('renders weather description', () => {
        render(<CurrentWeather data={mockData} isMetric={true} />);
        expect(screen.getByText('clear sky')).toBeInTheDocument();
    });

    it('renders pressure, visibility, and humidity', () => {
        render(<CurrentWeather data={mockData} isMetric={true} />);
        expect(screen.getByText('1013mb')).toBeInTheDocument();
        expect(screen.getByText('10.0 km')).toBeInTheDocument();
        expect(screen.getByText('65%')).toBeInTheDocument();
    });
});
