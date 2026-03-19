import React, { useMemo } from 'react';

// Generate deterministic pseudo-random values from a seed
const seeded = (seed) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
};

const Stars = ({ count = 40 }) => {
    const stars = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${seeded(i * 3) * 100}%`,
                top: `${seeded(i * 3 + 1) * 100}%`,
                size: 1 + seeded(i * 3 + 2) * 3,
                delay: `${seeded(i * 5) * 4}s`,
                duration: `${2 + seeded(i * 7) * 3}s`,
            })),
        [count],
    );

    return (
        <>
            {stars.map((s, i) => (
                <div
                    key={`star-${i}`}
                    className="bg-star"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: s.size,
                        height: s.size,
                        animationDelay: s.delay,
                        animationDuration: s.duration,
                    }}
                />
            ))}
        </>
    );
};

const Sunshine = ({ count = 8 }) => {
    const rays = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                angle: (360 / count) * i,
                delay: `${i * 0.3}s`,
            })),
        [count],
    );

    return (
        <div className="bg-sunshine">
            <div className="bg-sun-glow" />
            {rays.map((r, i) => (
                <div
                    key={`ray-${i}`}
                    className="bg-sun-ray"
                    style={{
                        transform: `rotate(${r.angle}deg)`,
                        animationDelay: r.delay,
                    }}
                />
            ))}
        </div>
    );
};

const Clouds = ({ count = 6 }) => {
    const clouds = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                top: `${10 + seeded(i * 4) * 60}%`,
                size: 60 + seeded(i * 4 + 1) * 80,
                opacity: 0.15 + seeded(i * 4 + 2) * 0.2,
                duration: `${30 + seeded(i * 4 + 3) * 40}s`,
                delay: `${-seeded(i * 6) * 30}s`,
            })),
        [count],
    );

    return (
        <>
            {clouds.map((c, i) => (
                <div
                    key={`cloud-${i}`}
                    className="bg-cloud"
                    style={{
                        top: c.top,
                        width: c.size,
                        height: c.size * 0.5,
                        opacity: c.opacity,
                        animationDuration: c.duration,
                        animationDelay: c.delay,
                    }}
                />
            ))}
        </>
    );
};

const RainDrops = ({ count = 60, heavy = false }) => {
    const drops = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${seeded(i * 2) * 100}%`,
                delay: `${seeded(i * 2 + 1) * 2}s`,
                duration: `${0.5 + seeded(i * 3) * (heavy ? 0.4 : 0.8)}s`,
                height: heavy ? 18 + seeded(i * 5) * 12 : 12 + seeded(i * 5) * 8,
            })),
        [count, heavy],
    );

    return (
        <>
            {drops.map((d, i) => (
                <div
                    key={`drop-${i}`}
                    className="bg-raindrop"
                    style={{
                        left: d.left,
                        animationDelay: d.delay,
                        animationDuration: d.duration,
                        height: d.height,
                    }}
                />
            ))}
        </>
    );
};

const SnowFlakes = ({ count = 40 }) => {
    const flakes = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: `${seeded(i * 3) * 100}%`,
                size: 3 + seeded(i * 3 + 1) * 6,
                delay: `${seeded(i * 3 + 2) * 6}s`,
                duration: `${4 + seeded(i * 4) * 6}s`,
                drift: -20 + seeded(i * 5) * 40,
            })),
        [count],
    );

    return (
        <>
            {flakes.map((f, i) => (
                <div
                    key={`flake-${i}`}
                    className="bg-snowflake"
                    style={{
                        left: f.left,
                        width: f.size,
                        height: f.size,
                        animationDelay: f.delay,
                        animationDuration: f.duration,
                        '--drift': `${f.drift}px`,
                    }}
                />
            ))}
        </>
    );
};

const Lightning = () => <div className="bg-lightning" />;

const BackgroundEffects = React.memo(({ weatherMain, isNight }) => {
    const main = weatherMain?.toLowerCase() || '';

    let effects = null;

    if (isNight && (main === 'clear' || main === '')) {
        // Đêm thoáng → ngôi sao lấp lánh
        effects = <Stars count={50} />;
    } else if (isNight && main === 'clouds') {
        // Đêm mây → sao ít + mây bay
        effects = (
            <>
                <Stars count={20} />
                <Clouds count={4} />
            </>
        );
    } else if (!isNight && main === 'clear') {
        // Ngày nắng → ánh nắng tỏa
        effects = <Sunshine count={10} />;
    } else if (!isNight && main === 'clouds') {
        // Ngày mây → mây bay
        effects = <Clouds count={6} />;
    } else if (main === 'rain' || main === 'drizzle') {
        // Mưa
        effects = (
            <>
                <RainDrops count={main === 'drizzle' ? 30 : 70} heavy={main === 'rain'} />
                {isNight && <Stars count={10} />}
            </>
        );
    } else if (main === 'thunderstorm') {
        // Sấm sét
        effects = (
            <>
                <RainDrops count={80} heavy />
                <Lightning />
            </>
        );
    } else if (main === 'snow') {
        // Tuyết
        effects = <SnowFlakes count={45} />;
    } else if (['mist', 'fog', 'haze', 'smoke'].includes(main)) {
        // Sương mù → mây chậm
        effects = <Clouds count={8} />;
    } else if (isNight) {
        effects = <Stars count={30} />;
    }

    if (!effects) return null;

    return (
        <div className="bg-effects" aria-hidden="true">
            {effects}
        </div>
    );
});

export default BackgroundEffects;
