import React from 'react';
import { format } from 'date-fns';
import { convertTemp } from '../utils/unitConversion';

const CalendarIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const DailyForecast = ({ data, isMetric }) => {
    const dailyData = data.list
        .filter((reading) => reading.dt_txt.includes('12:00:00'))
        .slice(0, 4);

    return (
        <div className="prediction-card">
            <h3>Weather Prediction</h3>
            <div className="prediction-list">
                {dailyData.map((day, index) => {
                    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                    return (
                        <div key={index} className="prediction-item">
                            <img src={iconUrl} alt="weather" className="prediction-icon" />
                            <div className="prediction-info">
                                <span className="prediction-date">
                                    {format(new Date(day.dt * 1000), 'MMMM d')}
                                </span>
                                <span className="prediction-desc">{day.weather[0].main}</span>
                            </div>
                            <div className="prediction-temps">
                                <span className="temp-high">
                                    {convertTemp(day.main.temp_max, isMetric)}°
                                </span>
                                <span className="temp-sep"> / </span>
                                <span className="temp-low">
                                    {convertTemp(day.main.temp_min, isMetric)}°
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyForecast;
