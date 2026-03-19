import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { convertTemp } from '../utils/unitConversion';

const TemperatureIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
);

const WindIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
);

const HumidityIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
);

const METRICS = {
    temp: { key: 'temp', label: 'Temp', unit: '°', color: '#f59e0b' },
    wind: { key: 'wind', label: 'Wind', unit: ' m/s', color: '#3b82f6' },
    humidity: { key: 'humidity', label: 'Humidity', unit: '%', color: '#06b6d4' },
};

const HourlyForecast = React.memo(({ data, isMetric }) => {
    const [activeMetric, setActiveMetric] = useState('temp');
    const todayData = data.list.slice(0, 8);
    const metric = METRICS[activeMetric];

    const getValue = (item) => {
        if (!item) return 0;
        switch (activeMetric) {
            case 'wind':
                return Math.round(item.wind?.speed || 0);
            case 'humidity':
                return item.main?.humidity || 0;
            default:
                return convertTemp(item.main?.temp || 0, isMetric);
        }
    };

    const chartData = useMemo(
        () => [
            {
                period: 'Morning',
                value: getValue(todayData[0]),
                icon: todayData[0]?.weather[0].icon,
            },
            {
                period: 'Afternoon',
                value: getValue(todayData[2]),
                icon: todayData[2]?.weather[0].icon,
            },
            {
                period: 'Evening',
                value: getValue(todayData[4]),
                icon: todayData[4]?.weather[0].icon,
            },
            { period: 'Night', value: getValue(todayData[6]), icon: todayData[6]?.weather[0].icon },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activeMetric, isMetric, data],
    );

    const gradientId = `metricGradient-${activeMetric}`;

    const CustomDot = (props) => {
        const { cx, cy, index } = props;
        const item = chartData[index];
        if (!item || !cx || !cy) return null;
        const iconUrl = `https://openweathermap.org/img/wn/${item.icon}@2x.png`;
        return (
            <g>
                <circle cx={cx} cy={cy} r={5} fill="#1e3a5f" stroke="white" strokeWidth={2} />
                <image href={iconUrl} x={cx - 20} y={cy - 50} width={40} height={40} />
            </g>
        );
    };

    return (
        <div className="temp-today-card">
            <div className="temp-today-header">
                <h3>How's the temperature today?</h3>
                <div className="temp-today-icons">
                    <button
                        className={`temp-icon ${activeMetric === 'temp' ? 'active' : ''}`}
                        onClick={() => setActiveMetric('temp')}
                    >
                        <TemperatureIcon />
                    </button>
                    <button
                        className={`temp-icon ${activeMetric === 'wind' ? 'active' : ''}`}
                        onClick={() => setActiveMetric('wind')}
                    >
                        <WindIcon />
                    </button>
                    <button
                        className={`temp-icon ${activeMetric === 'humidity' ? 'active' : ''}`}
                        onClick={() => setActiveMetric('humidity')}
                    >
                        <HumidityIcon />
                    </button>
                </div>
            </div>

            <div className="temp-chart-container">
                <ResponsiveContainer width="100%" height={180}>
                    <AreaChart
                        data={chartData}
                        margin={{ top: 40, right: 20, left: 20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={metric.color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="period"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#999' }}
                        />
                        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip formatter={(value) => [`${value}${metric.unit}`, metric.label]} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={metric.color}
                            strokeWidth={3}
                            fill={`url(#${gradientId})`}
                            dot={<CustomDot />}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="temp-labels">
                    {chartData.map((item, i) => (
                        <div key={i} className="temp-label-item">
                            <span className="temp-value">
                                {item.value}
                                {metric.unit}
                            </span>
                            <span className="temp-period">{item.period}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default HourlyForecast;
