import React, { useMemo } from 'react';
import './WeatherAnimation.css';

const rand = (min, max) => Math.random() * (max - min) + min;

/* ───── Rain ───── */
const Rain = ({ count = 30, heavy = false }) => {
    const drops = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${rand(5, 95)}%`,
                height: heavy ? rand(18, 30) : rand(10, 18),
                delay: rand(0, 2),
                duration: heavy ? rand(0.3, 0.6) : rand(0.5, 1),
                opacity: rand(0.4, 0.9),
            })),
        [count, heavy],
    );

    return (
        <div className="wa-rain">
            {drops.map((d, i) => (
                <div
                    key={i}
                    className="wa-drop"
                    style={{
                        left: d.left,
                        height: `${d.height}px`,
                        animationDelay: `${d.delay}s`,
                        animationDuration: `${d.duration}s`,
                        opacity: d.opacity,
                    }}
                />
            ))}
        </div>
    );
};

/* ───── Thunderstorm ───── */
const Thunderstorm = () => (
    <div className="wa-thunderstorm">
        <Rain count={35} heavy />
        <div className="wa-lightning" />
    </div>
);

/* ───── Snow ───── */
const Snow = ({ count = 25 }) => {
    const flakes = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${rand(5, 95)}%`,
                size: rand(4, 10),
                delay: rand(0, 5),
                duration: rand(2.5, 5),
                drift: rand(-20, 20),
                opacity: rand(0.5, 1),
            })),
        [count],
    );

    return (
        <div className="wa-snow">
            {flakes.map((f, i) => (
                <div
                    key={i}
                    className="wa-flake"
                    style={{
                        left: f.left,
                        width: `${f.size}px`,
                        height: `${f.size}px`,
                        animationDelay: `${f.delay}s`,
                        animationDuration: `${f.duration}s`,
                        '--drift': `${f.drift}px`,
                        opacity: f.opacity,
                    }}
                />
            ))}
        </div>
    );
};

/* ───── Stars (night background) ───── */
const Stars = ({ count = 18 }) => {
    const stars = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${rand(5, 95)}%`,
                top: `${rand(5, 95)}%`,
                size: rand(1.5, 3.5),
                delay: rand(0, 4),
                duration: rand(1.5, 3.5),
            })),
        [count],
    );

    return (
        <div className="wa-stars">
            {stars.map((s, i) => (
                <div
                    key={i}
                    className="wa-star"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

/* ───── Clear (Sun) ───── */
const Clear = () => (
    <div className="wa-clear">
        <div className="wa-sun">
            <div className="wa-sun-rays" />
            <div className="wa-sun-core" />
            <div className="wa-sun-ring" />
        </div>
    </div>
);

/* ───── Night Clear (Moon + Stars) ───── */
const NightClear = () => (
    <div className="wa-night-clear">
        <Stars count={22} />
        <div className="wa-moon">
            <div className="wa-moon-halo" />
            <div className="wa-moon-body" />
            <div className="wa-moon-shadow" />
        </div>
    </div>
);

/* ───── Clouds ───── */
const CloudsAnim = () => (
    <div className="wa-clouds">
        <div className="wa-cloud wa-cloud-1" />
        <div className="wa-cloud wa-cloud-2" />
        <div className="wa-cloud wa-cloud-3" />
    </div>
);

/* ───── Night Clouds (dark clouds + moon + stars) ───── */
const NightCloudsAnim = () => (
    <div className="wa-night-clouds">
        <Stars count={12} />
        <div className="wa-cloud-moon" />
        <div className="wa-cloud wa-cloud-1" />
        <div className="wa-cloud wa-cloud-2" />
        <div className="wa-cloud wa-cloud-3" />
    </div>
);

/* ───── Mist / Fog ───── */
const Mist = () => (
    <div className="wa-mist">
        <div className="wa-mist-layer wa-mist-1" />
        <div className="wa-mist-layer wa-mist-2" />
        <div className="wa-mist-layer wa-mist-3" />
    </div>
);

/* ───── Dust / Sand ───── */
const DustSand = ({ count = 20 }) => {
    const particles = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${rand(5, 90)}%`,
                top: `${rand(5, 90)}%`,
                size: rand(3, 7),
                delay: rand(0, 3),
                duration: rand(2, 4.5),
                opacity: rand(0.3, 0.7),
            })),
        [count],
    );

    return (
        <div className="wa-dust">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="wa-dust-particle"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    );
};

/* ───── Tornado ───── */
const TornadoAnim = () => (
    <div className="wa-tornado">
        <div className="wa-funnel wa-funnel-1" />
        <div className="wa-funnel wa-funnel-2" />
        <div className="wa-funnel wa-funnel-3" />
    </div>
);

/* ───── Main Component ───── */
const WeatherAnimation = ({ weatherMain, size = 160, isNight = false }) => {
    const renderAnimation = () => {
        switch (weatherMain) {
            case 'Thunderstorm':
                return (
                    <>
                        {isNight && <Stars count={8} />}
                        <Thunderstorm />
                    </>
                );
            case 'Drizzle':
                return (
                    <>
                        {isNight && <Stars count={8} />}
                        <Rain count={15} heavy={false} />
                    </>
                );
            case 'Rain':
                return (
                    <>
                        {isNight && <Stars count={8} />}
                        <Rain count={30} heavy />
                    </>
                );
            case 'Snow':
                return (
                    <>
                        {isNight && <Stars count={10} />}
                        <Snow />
                    </>
                );
            case 'Clear':
                return isNight ? <NightClear /> : <Clear />;
            case 'Clouds':
                return isNight ? <NightCloudsAnim /> : <CloudsAnim />;
            case 'Mist':
            case 'Fog':
            case 'Haze':
            case 'Smoke':
                return (
                    <>
                        {isNight && <Stars count={6} />}
                        <Mist />
                    </>
                );
            case 'Dust':
            case 'Sand':
            case 'Ash':
                return (
                    <>
                        {isNight && <Stars count={6} />}
                        <DustSand />
                    </>
                );
            case 'Squall':
                return (
                    <>
                        {isNight && <Stars count={6} />}
                        <Rain count={40} heavy />
                    </>
                );
            case 'Tornado':
                return (
                    <>
                        {isNight && <Stars count={8} />}
                        <TornadoAnim />
                    </>
                );
            default:
                return isNight ? <NightCloudsAnim /> : <CloudsAnim />;
        }
    };

    return (
        <div
            className={`wa-container${isNight ? ' wa-night' : ''}`}
            style={{ width: size, height: size }}
        >
            {renderAnimation()}
        </div>
    );
};

export default WeatherAnimation;
