import React from 'react';
import { format } from 'date-fns';
import { convertTemp, getTempColor } from '../utils/unitConversion';

const DailyForecast = React.memo(({ data, isMetric }) => {
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
                            <img
                                src={iconUrl}
                                alt={day.weather[0].description}
                                className="prediction-icon"
                            />
                            <div className="prediction-info">
                                <span className="prediction-date">
                                    {format(new Date(day.dt * 1000), 'MMMM d')}
                                </span>
                                <span className="prediction-desc">{day.weather[0].main}</span>
                            </div>
                            <div className="prediction-temps">
                                <span
                                    className="temp-high"
                                    style={{ color: getTempColor(day.main.temp_max) }}
                                >
                                    {convertTemp(day.main.temp_max, isMetric)}°
                                </span>
                                <span className="temp-sep"> / </span>
                                <span
                                    className="temp-low"
                                    style={{ color: getTempColor(day.main.temp_min) }}
                                >
                                    {convertTemp(day.main.temp_min, isMetric)}°
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default DailyForecast;
