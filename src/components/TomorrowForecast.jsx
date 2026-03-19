import React from 'react';
import PropTypes from 'prop-types';
import { convertTemp, getTempColor } from '../utils/unitConversion';
import { getWeatherGradient } from '../utils/weatherGradients';
import WeatherAnimation from './WeatherAnimation';
import './TomorrowForecast.css';

const TomorrowForecast = React.memo(({ data, isMetric }) => {
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
    const isNight = tomorrow.weather[0].icon.endsWith('n');
    const tempColor = getTempColor(tomorrow.main.temp);

    return (
        <div className="tomorrow-card" style={{ background: gradient }}>
            <div className="tomorrow-content">
                <span className="tomorrow-label">Tomorrow</span>
                <h2 className="tomorrow-city">{cityName}</h2>
                <div className="tomorrow-illustration">
                    <WeatherAnimation
                        weatherMain={tomorrow.weather[0].main}
                        size={140}
                        isNight={isNight}
                    />
                </div>
                <div className="tomorrow-temp">
                    <h1 style={{ color: tempColor }}>
                        {convertTemp(tomorrow.main.temp, isMetric)}°{isMetric ? 'C' : 'F'}
                    </h1>
                </div>
                <p className="tomorrow-desc">{tomorrow.weather[0].description}</p>
            </div>
        </div>
    );
});

TomorrowForecast.propTypes = {
    data: PropTypes.shape({
        list: PropTypes.array.isRequired,
        city: PropTypes.shape({ name: PropTypes.string }),
    }).isRequired,
    isMetric: PropTypes.bool.isRequired,
};

export default TomorrowForecast;
