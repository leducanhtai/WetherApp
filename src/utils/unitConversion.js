export const convertTemp = (temp, isMetric) => {
    if (isMetric) {
        return Math.round(temp);
    }
    return Math.round((temp * 9) / 5 + 32);
};

export const convertSpeed = (speed, isMetric) => {
    if (isMetric) {
        return `${Math.round(speed)} m/s`;
    }
    return `${Math.round(speed * 2.237)} mph`;
};

// Temperature-based color: cold → blue, mild → green, warm → orange, hot → red
export const getTempColor = (tempCelsius) => {
    if (tempCelsius <= 0) return '#60a5fa'; // icy blue
    if (tempCelsius <= 10) return '#67e8f9'; // cool cyan
    if (tempCelsius <= 20) return '#4ade80'; // mild green
    if (tempCelsius <= 30) return '#fbbf24'; // warm amber
    if (tempCelsius <= 38) return '#f97316'; // hot orange
    return '#ef4444'; // scorching red
};
