// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeatherData } from './api/weatherService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import AirQuality from './components/AirQuality';
import SunInfo from './components/SunInfo';
import HourlyForecast from './components/HourlyForecast';
import TomorrowForecast from './components/TomorrowForecast';
import DailyForecast from './components/DailyForecast';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMetric, setIsMetric] = useState(true);

    const handleSearch = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherData(city);
            setWeatherData(data);
        } catch (err) {
            setError('City not found. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch('Hanoi');
    }, []);

    const toggleUnit = () => setIsMetric(!isMetric);

    return (
        <div className="app-container">
            <video className="bg-video" autoPlay muted loop playsInline>
                <source src={`${process.env.PUBLIC_URL}/background.webm`} type="video/webm" />
            </video>
            <div className="bg-overlay"></div>
            {/* Header */}
            <header className="app-header">
                <div className="greeting">
                    <div className="avatar">👤</div>
                    <div>
                        <p className="greeting-text">Hello,</p>
                        <h2 className="user-name">Weather Fan</h2>
                    </div>
                </div>

                <SearchBar onSearch={handleSearch} />

                <div className="header-actions">
                    <div className="unit-toggle" onClick={toggleUnit}>
                        <span className={isMetric ? 'active' : ''}>°C</span>
                        <span className="divider">/</span>
                        <span className={!isMetric ? 'active' : ''}>°F</span>
                    </div>
                    <div className="notification-bell">🔔</div>
                </div>
            </header>

            {error && <div className="error-msg">{error}</div>}
            {loading && <div className="loading-msg">Loading weather data...</div>}

            {weatherData && !loading && (
                <div className="dashboard-grid">
                    {/* Row 1 */}
                    <CurrentWeather data={weatherData.current} isMetric={isMetric} />
                    <AirQuality
                        data={weatherData.airQuality}
                        wind={weatherData.current.wind}
                        weatherMain={weatherData.current.weather[0].main}
                    />
                    <SunInfo data={weatherData.current} isMetric={isMetric} />

                    {/* Row 2 */}
                    <HourlyForecast data={weatherData.forecast} isMetric={isMetric} />
                    <TomorrowForecast data={weatherData.forecast} isMetric={isMetric} />
                    <DailyForecast data={weatherData.forecast} isMetric={isMetric} />
                </div>
            )}
        </div>
    );
}

export default App;
