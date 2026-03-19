import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { convertTemp } from '../utils/unitConversion';
import './SunInfo.css';

const SunInfo = React.memo(({ data, isMetric }) => {
    const sys = data?.sys;
    const main = data?.main;
    const weather = data?.weather;
    const name = data?.name;

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Estimate UV index based on weather conditions
    const uv = useMemo(() => {
        if (!weather) return { value: 0, label: 'Low', desc: 'No risk from UV rays' };
        const icon = weather[0].icon;
        if (icon.includes('n')) return { value: 0, label: 'Low', desc: 'No risk from UV rays' };
        if (icon.includes('01') || icon.includes('02'))
            return { value: 7, label: 'High', desc: 'High risk from UV rays' };
        if (icon.includes('03') || icon.includes('04'))
            return { value: 4, label: 'Moderate', desc: 'Moderate risk from UV rays' };
        return { value: 2, label: 'Low', desc: 'Low risk from UV rays' };
    }, [weather]);

    // Sun position along arc (0 = sunrise, 1 = sunset)
    const sunProgress = useMemo(() => {
        if (!sys) return 0;
        const now = Date.now() / 1000;
        const rise = sys.sunrise;
        const set = sys.sunset;
        if (now <= rise) return 0;
        if (now >= set) return 1;
        return (now - rise) / (set - rise);
    }, [sys]);

    if (!data) return null;

    // SVG arc position
    const sunX = 10 + sunProgress * 180;
    const sunY = 90 - Math.sin(sunProgress * Math.PI) * 80;

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
                                stroke="rgba(245,158,11,0.3)"
                                strokeWidth="2.5"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                            {/* Filled arc up to sun position */}
                            <path
                                d="M 10 90 Q 100 -10 190 90"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                fill="none"
                                strokeDashoffset={280 - sunProgress * 280}
                                strokeDasharray="280"
                            />
                            <circle cx={sunX} cy={sunY} r="10" fill="#f59e0b" />
                            <circle cx={sunX} cy={sunY} r="5" fill="#fbbf24" />
                        </svg>
                    </div>
                    <div className="sun-times">
                        <div className="sun-time">
                            <span className="sun-label">Sunrise</span>
                            <span className="sun-value">{formatTime(sys.sunrise)}</span>
                        </div>
                        <div className="sun-time">
                            <span className="sun-label">Sunset</span>
                            <span className="sun-value">{formatTime(sys.sunset)}</span>
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
});

SunInfo.propTypes = {
    data: PropTypes.shape({
        sys: PropTypes.object,
        main: PropTypes.object,
        weather: PropTypes.array,
        name: PropTypes.string,
    }),
    isMetric: PropTypes.bool.isRequired,
};

export default SunInfo;
