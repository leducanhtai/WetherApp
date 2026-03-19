import React from 'react';
import { Wind } from 'lucide-react';
import { getAirQualityGradient } from '../utils/weatherGradients';

const aqLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Hazardous'];
const aqColors = ['#4ade80', '#facc15', '#fb923c', '#f87171', '#a855f7'];

const AirQuality = React.memo(({ data, wind, weatherMain }) => {
    if (!data || !data.list || !data.list[0]) return null;

    const aqi = data.list[0].main.aqi;
    const pm25 = Math.round(data.list[0].components.pm2_5);
    const gradient = getAirQualityGradient(weatherMain);
    const label = aqLabels[aqi - 1] || 'Unknown';
    const color = aqColors[aqi - 1] || '#fff';

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
                                <span className="aq-badge" style={{ background: color }}>
                                    {label}
                                </span>
                            </div>
                            <p className="aq-wind">{getWindDirection(wind?.deg || 0)}</p>
                        </div>
                        <div className="aq-animation">
                            <Wind size={100} strokeWidth={1} style={{ opacity: 0.25 }} />
                        </div>
                    </div>

                    {/* AQI scale bar */}
                    <div className="aq-scale-bar">
                        {aqLabels.map((l, i) => (
                            <div
                                key={l}
                                className={`aq-scale-segment${aqi === i + 1 ? ' active' : ''}`}
                                style={{
                                    background: aqColors[i],
                                    opacity: aqi === i + 1 ? 1 : 0.35,
                                }}
                            >
                                <span>{l}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AirQuality;
