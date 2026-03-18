import React from 'react';
import { convertTemp } from '../utils/unitConversion';

const SunInfo = ({ data, isMetric }) => {
    if (!data) return null;

    const { sys, main, weather, name } = data;

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Estimate UV index based on weather conditions
    const getUVIndex = () => {
        const icon = weather[0].icon;
        if (icon.includes('n')) return { value: 0, label: 'Low', desc: 'No risk from UV rays' };
        if (icon.includes('01') || icon.includes('02'))
            return { value: 7, label: 'High', desc: 'High risk from UV rays' };
        if (icon.includes('03') || icon.includes('04'))
            return { value: 4, label: 'Moderate', desc: 'Moderate risk from UV rays' };
        return { value: 2, label: 'Low', desc: 'Low risk from UV rays' };
    };

    const uv = getUVIndex();

    return (
        <div className="sun-info-column">
            {/* Top: Current temp + location */}
            <div className="sun-header-card">
                <div className="sun-header-left">
                    <p className="sun-condition">{weather[0].main}</p>
                    <p className="sun-location">
                        {name}, {sys.country}
                    </p>
                </div>
                <div className="sun-header-right">
                    <h1>
                        {convertTemp(main.temp, isMetric)}°{isMetric ? 'C' : 'F'}
                    </h1>
                </div>
            </div>

            {/* Sunrise / Sunset arc */}
            <div className="sun-arc-card">
                <div className="sun-arc">
                    <div className="arc-visual">
                        <svg viewBox="0 0 200 100" className="arc-svg">
                            <path
                                d="M 10 90 Q 100 -10 190 90"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                            <circle cx="100" cy="10" r="12" fill="#f59e0b" />
                            <circle cx="100" cy="10" r="6" fill="#fbbf24" />
                        </svg>
                    </div>
                    <div className="sun-times">
                        <div className="sun-time">
                            <span className="sun-label">Sunset</span>
                            <span className="sun-value">{formatTime(sys.sunset)}</span>
                        </div>
                        <div className="sun-time">
                            <span className="sun-label">Sunrise</span>
                            <span className="sun-value">{formatTime(sys.sunrise)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* UV Index */}
            <div className="uv-card">
                <div className="uv-content">
                    <div className="uv-icon">☀️</div>
                    <div className="uv-info">
                        <div className="uv-value-row">
                            <h2>{uv.value} UVI</h2>
                            <span className="uv-badge">{uv.label}</span>
                        </div>
                        <p className="uv-desc">{uv.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SunInfo;
