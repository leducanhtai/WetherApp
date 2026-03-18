const weatherGradients = {
    Thunderstorm: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    Drizzle: 'linear-gradient(135deg, #3a7bd5 0%, #6dd5ed 50%, #b0c6d4 100%)',
    Rain: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4b79a1 100%)',
    Snow: 'linear-gradient(135deg, #e6dada 0%, #a8c0d6 50%, #d4e4f0 100%)',
    Mist: 'linear-gradient(135deg, #606c88 0%, #8fa1b8 50%, #b0bec5 100%)',
    Smoke: 'linear-gradient(135deg, #56534f 0%, #7a7572 50%, #9e9a97 100%)',
    Haze: 'linear-gradient(135deg, #7b6d5e 0%, #a89279 50%, #c4b396 100%)',
    Dust: 'linear-gradient(135deg, #8b7355 0%, #b8956a 50%, #d4b896 100%)',
    Fog: 'linear-gradient(135deg, #808080 0%, #a0a0a0 50%, #c0c0c0 100%)',
    Sand: 'linear-gradient(135deg, #c2a060 0%, #d4b87a 50%, #e6d094 100%)',
    Ash: 'linear-gradient(135deg, #4a4a4a 0%, #6b6b6b 50%, #8c8c8c 100%)',
    Squall: 'linear-gradient(135deg, #2c3e50 0%, #4a6274 50%, #5d7d95 100%)',
    Tornado: 'linear-gradient(135deg, #1a1a2e 0%, #333366 50%, #2b2b52 100%)',
    Clear: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #1e3a5f 100%)',
    Clouds: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 50%, #f59e0b 100%)',
};

const BASE = process.env.PUBLIC_URL || '';

const weatherVideos = {
    Thunderstorm: `${BASE}/rain.webm`,
    Drizzle: `${BASE}/rain.webm`,
    Rain: `${BASE}/rain.webm`,
    Snow: `${BASE}/snow.webm`,
    Mist: `${BASE}/mist.webm`,
    Smoke: `${BASE}/mist.webm`,
    Haze: `${BASE}/mist.webm`,
    Dust: `${BASE}/mist.webm`,
    Fog: `${BASE}/mist.webm`,
    Sand: `${BASE}/mist.webm`,
    Ash: `${BASE}/mist.webm`,
    Squall: `${BASE}/rain.webm`,
    Tornado: `${BASE}/rain.webm`,
    Clear: `${BASE}/clear.webm`,
    Clouds: `${BASE}/cloudy(night).webm`,
};

export const getWeatherGradient = (weatherMain) => {
    return weatherGradients[weatherMain] || weatherGradients.Clouds;
};

export const getWeatherVideo = (weatherMain) => {
    return weatherVideos[weatherMain] || weatherVideos.Clouds;
};

export const getAirQualityGradient = (weatherMain) => {
    const aqGradients = {
        Thunderstorm: 'linear-gradient(180deg, #2d3748 0%, #4a5568 60%, #718096 100%)',
        Drizzle: 'linear-gradient(180deg, #4a7a8f 0%, #6a9ab0 60%, #8ab4c8 100%)',
        Rain: 'linear-gradient(180deg, #3a5a7a 0%, #5a7a9a 60%, #7a9ab5 100%)',
        Snow: 'linear-gradient(180deg, #8a9aaa 0%, #a0b0c0 60%, #b8c8d5 100%)',
        Mist: 'linear-gradient(180deg, #607080 0%, #788898 60%, #90a0b0 100%)',
        Smoke: 'linear-gradient(180deg, #506068 0%, #687880 60%, #808a90 100%)',
        Haze: 'linear-gradient(180deg, #7a6a55 0%, #9a8570 60%, #b0a088 100%)',
        Dust: 'linear-gradient(180deg, #8a7050 0%, #a08a68 60%, #b8a080 100%)',
        Fog: 'linear-gradient(180deg, #686868 0%, #808080 60%, #989898 100%)',
        Sand: 'linear-gradient(180deg, #a08a50 0%, #b8a068 60%, #d0b880 100%)',
        Ash: 'linear-gradient(180deg, #484848 0%, #606060 60%, #787878 100%)',
        Squall: 'linear-gradient(180deg, #344858 0%, #4a6070 60%, #607888 100%)',
        Tornado: 'linear-gradient(180deg, #222244 0%, #3a3a5a 60%, #505070 100%)',
        Clear: 'linear-gradient(180deg, #4a8aaa 0%, #6aaac5 60%, #88c0d8 100%)',
        Clouds: 'linear-gradient(180deg, #6a8aaa 0%, #8aa8c0 60%, #a0b8d0 100%)',
    };
    return aqGradients[weatherMain] || aqGradients.Clouds;
};

export const getTomorrowGradient = (weatherMain) => {
    const tomorrowGradients = {
        Thunderstorm: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        Drizzle: 'linear-gradient(135deg, #3a7bd5 0%, #6dd5ed 50%, #b0c6d4 100%)',
        Rain: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4b79a1 100%)',
        Snow: 'linear-gradient(135deg, #e6dada 0%, #a8c0d6 50%, #d4e4f0 100%)',
        Mist: 'linear-gradient(135deg, #606c88 0%, #8fa1b8 50%, #b0bec5 100%)',
        Smoke: 'linear-gradient(135deg, #56534f 0%, #7a7572 50%, #9e9a97 100%)',
        Haze: 'linear-gradient(135deg, #7b6d5e 0%, #a89279 50%, #c4b396 100%)',
        Dust: 'linear-gradient(135deg, #8b7355 0%, #b8956a 50%, #d4b896 100%)',
        Fog: 'linear-gradient(135deg, #808080 0%, #a0a0a0 50%, #c0c0c0 100%)',
        Sand: 'linear-gradient(135deg, #c2a060 0%, #d4b87a 50%, #e6d094 100%)',
        Ash: 'linear-gradient(135deg, #4a4a4a 0%, #6b6b6b 50%, #8c8c8c 100%)',
        Squall: 'linear-gradient(135deg, #2c3e50 0%, #4a6274 50%, #5d7d95 100%)',
        Tornado: 'linear-gradient(135deg, #1a1a2e 0%, #333366 50%, #2b2b52 100%)',
        Clear: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #1e3a5f 100%)',
        Clouds: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 50%, #f59e0b 100%)',
    };
    return tomorrowGradients[weatherMain] || tomorrowGradients.Clouds;
};
