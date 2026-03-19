import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the weather hook
jest.mock('./hooks/useWeather', () => () => ({
    weatherData: null,
    loading: true,
    error: null,
    isMetric: true,
    searchCity: jest.fn(),
    searchByLocation: jest.fn(),
    toggleUnit: jest.fn(),
}));

// Mock BackgroundEffects to avoid complex rendering
jest.mock('./components/BackgroundEffects', () => {
    return function MockBG() {
        return <div data-testid="bg-effects" />;
    };
});

describe('App', () => {
    it('renders app logo', () => {
        render(<App />);
        expect(screen.getByText('WeatherApp')).toBeInTheDocument();
    });

    it('renders search input', () => {
        render(<App />);
        expect(screen.getByPlaceholderText('Search city...')).toBeInTheDocument();
    });

    it('renders unit toggle button', () => {
        render(<App />);
        expect(screen.getByLabelText('Toggle temperature unit')).toBeInTheDocument();
    });

    it('shows skeleton loader when loading', () => {
        render(<App />);
        const grid = document.querySelector('.skeleton-grid');
        expect(grid).toBeInTheDocument();
    });
});
