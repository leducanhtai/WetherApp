import React from 'react';
import { convertTemp } from '../utils/unitConversion';
import { getWeatherGradient, getWeatherVideo } from '../utils/weatherGradients';

const CurrentWeather = ({ data, isMetric }) => {
    if (!data) return null;

    const { main, weather, visibility } = data;
    const gradient = getWeatherGradient(weather[0].main);
    const videoSrc = getWeatherVideo(weather[0].main);

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
                                <h1>
                                    {convertTemp(main.temp, isMetric)}°{isMetric ? 'C' : 'F'}
                                </h1>
                                <span className="feels-like">
                                    {convertTemp(main.feels_like, isMetric)}°{isMetric ? 'C' : 'F'}
                                </span>
                            </div>
                            <p className="weather-desc">{weather[0].description}</p>
                        </div>
                        <div className="weather-card-animation">
                            <video
                                src={videoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="weather-video-icon"
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
};

export default CurrentWeather;
