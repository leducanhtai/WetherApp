import React from 'react';
import { convertTemp } from '../utils/unitConversion';
import { getWeatherGradient, getWeatherVideo } from '../utils/weatherGradients';

const TomorrowForecast = ({ data, isMetric }) => {
    // Find tomorrow's noon forecast
    const tomorrow =
        data.list.find((item) => {
            const date = new Date(item.dt * 1000);
            const now = new Date();
            return date.getDate() === now.getDate() + 1 && item.dt_txt.includes('12:00:00');
        }) || data.list[8]; // fallback to ~24h from now

    if (!tomorrow) return null;

    const cityName = data.city?.name || 'Unknown';
    const gradient = getWeatherGradient(tomorrow.weather[0].main);
    const videoSrc = getWeatherVideo(tomorrow.weather[0].main);

    return (
        <div className="tomorrow-card" style={{ background: gradient }}>
            <div className="tomorrow-content">
                <span className="tomorrow-label">Tomorrow</span>
                <h2 className="tomorrow-city">{cityName}</h2>
                <div className="tomorrow-illustration">
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="tomorrow-video-icon"
                    />
                </div>
                <div className="tomorrow-temp">
                    <h1>
                        {convertTemp(tomorrow.main.temp, isMetric)}°{isMetric ? 'C' : 'F'}
                    </h1>
                </div>
                <p className="tomorrow-desc">{tomorrow.weather[0].description}</p>
            </div>
        </div>
    );
};

export default TomorrowForecast;
