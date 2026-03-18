import React from 'react';
import { getAirQualityGradient } from '../utils/weatherGradients';

const AirQuality = ({ data, wind, weatherMain }) => {
    if (!data || !data.list || !data.list[0]) return null;

    const aqi = data.list[0].main.aqi;
    const pm25 = Math.round(data.list[0].components.pm2_5);
    const gradient = getAirQualityGradient(weatherMain);

    const getWindDirection = (deg) => {
        const directions = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW'];
        const index = Math.round(deg / 45) % 8;
        return directions[index] + ' Wind';
    };

    return (
        <div className="air-quality-card" style={{ background: gradient }}>
            <div className="air-quality-overlay"></div>
            <div className="air-quality-bg">
                <div className="air-quality-content">
                    <div className="aq-header">
                        <h3>Air Quality</h3>
                        <p className="aq-subtitle">Main pollutant : PM 2.5</p>
                    </div>

                    <div className="aq-main">
                        <div className="aq-left">
                            <div className="aq-value">
                                <h1>{pm25}</h1>
                                <span className="aq-badge">AQI</span>
                            </div>
                            <p className="aq-wind">{getWindDirection(wind?.deg || 0)}</p>
                        </div>
                        <div className="aq-animation">
                            <video
                                src={`${process.env.PUBLIC_URL}/Airplane.webm`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="aq-video-icon"
                            />
                        </div>
                    </div>

                    <div className="aq-scale">
                        <button className={`aq-btn ${aqi <= 2 ? 'active' : ''}`}>Good</button>
                        <button className={`aq-btn ${aqi === 3 ? 'active' : ''}`}>Standard</button>
                        <button className={`aq-btn ${aqi >= 4 ? 'active' : ''}`}>Hazardous</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AirQuality;
