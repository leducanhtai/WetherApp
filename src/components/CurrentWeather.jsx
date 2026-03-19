import React from 'react';
import PropTypes from 'prop-types';
import { convertTemp, getTempColor } from '../utils/unitConversion';
import { getWeatherGradient } from '../utils/weatherGradients';
import WeatherAnimation from './WeatherAnimation';
import './CurrentWeather.css';

const CurrentWeather = React.memo(({ data, isMetric }) => {
    if (!data) return null;

    const { main, weather, visibility } = data;
    const gradient = getWeatherGradient(weather[0].main);
    const isNight = weather[0].icon.endsWith('n');
    const tempColor = getTempColor(main.temp);

    return (
        <div className="weather-card" style={{ background: gradient }}>
            <div className="weather-card-bg">
                <div className="weather-card-content">
                    <div className="weather-card-top">
                        <div>
                            <div className="weather-badge">
                                <span>Weather</span>
                            </div>
                            <p className="weather-subtitle">What's the weather.</p>
                        </div>
                    </div>

                    <div className="weather-card-main">
                        <div className="weather-card-left">
                            <div className="weather-card-temp">
                                <h1 style={{ color: tempColor }}>
                                    {convertTemp(main.temp, isMetric)}°{isMetric ? 'C' : 'F'}
                                </h1>
                                <span className="feels-like">
                                    {convertTemp(main.feels_like, isMetric)}°{isMetric ? 'C' : 'F'}
                                </span>
                            </div>
                            <p className="weather-desc">{weather[0].description}</p>
                        </div>
                        <div className="weather-card-animation">
                            <WeatherAnimation
                                weatherMain={weather[0].main}
                                size={160}
                                isNight={isNight}
                            />
                        </div>
                    </div>

                    <div className="weather-info-row">
                        <div className="weather-info-pill">
                            <span className="info-label">Pressure</span>
                            <span className="info-value">{main.pressure}mb</span>
                        </div>
                        <div className="weather-info-pill">
                            <span className="info-label">Visibility</span>
                            <span className="info-value">{(visibility / 1000).toFixed(1)} km</span>
                        </div>
                        <div className="weather-info-pill">
                            <span className="info-label">Humidity</span>
                            <span className="info-value">{main.humidity}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

CurrentWeather.propTypes = {
    data: PropTypes.shape({
        main: PropTypes.object.isRequired,
        weather: PropTypes.array.isRequired,
        visibility: PropTypes.number.isRequired,
    }),
    isMetric: PropTypes.bool.isRequired,
};

export default CurrentWeather;
