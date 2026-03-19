// src/App.js
import React, { useMemo } from 'react';
import './App.css';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import AirQuality from './components/AirQuality';
import SunInfo from './components/SunInfo';
import HourlyForecast from './components/HourlyForecast';
import TomorrowForecast from './components/TomorrowForecast';
import DailyForecast from './components/DailyForecast';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorMessage from './components/ErrorMessage';
import { CloudSun } from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';

function App() {
    const { weatherData, loading, error, isMetric, searchCity, searchByLocation, toggleUnit } =
        useWeather();

    const { bgClass, weatherMain, isNight } = useMemo(() => {
        if (!weatherData?.current?.weather?.[0])
            return { bgClass: 'bg-default', weatherMain: '', isNight: false };
        const w = weatherData.current.weather[0];
        const night = w.icon.endsWith('n');
        const mainLower = w.main.toLowerCase();
        return {
            bgClass: `bg-${mainLower}${night ? '-night' : ''}`,
            weatherMain: w.main,
            isNight: night,
        };
    }, [weatherData]);

    return (
        <div className={`app-bg ${bgClass}`}>
            <BackgroundEffects weatherMain={weatherMain} isNight={isNight} />
            <div className="bg-overlay"></div>
            <div className="app-container">
                <header className="app-header">
                    <div className="app-logo">
                        <CloudSun size={28} />
                        <span className="app-logo-text">WeatherApp</span>
                    </div>

                    <SearchBar onSearch={searchCity} onLocate={searchByLocation} />

                    <div className="header-actions">
                        <button
                            className="unit-toggle"
                            onClick={toggleUnit}
                            aria-label="Toggle temperature unit"
                        >
                            <span className={isMetric ? 'active' : ''}>°C</span>
                            <span className="divider">/</span>
                            <span className={!isMetric ? 'active' : ''}>°F</span>
                        </button>
                    </div>
                </header>

                <ErrorMessage
                    error={error}
                    onRetry={() => searchCity(localStorage.getItem('weather_last_city') || 'Hanoi')}
                />

                {loading && <SkeletonLoader />}

                {weatherData && !loading && (
                    <div className="dashboard-grid fade-in">
                        <CurrentWeather data={weatherData.current} isMetric={isMetric} />
                        <AirQuality
                            data={weatherData.airQuality}
                            wind={weatherData.current?.wind}
                            weatherMain={weatherData.current?.weather?.[0]?.main}
                        />
                        <SunInfo data={weatherData.current} isMetric={isMetric} />
                        <HourlyForecast data={weatherData.forecast} isMetric={isMetric} />
                        <TomorrowForecast data={weatherData.forecast} isMetric={isMetric} />
                        <DailyForecast data={weatherData.forecast} isMetric={isMetric} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
