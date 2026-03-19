import { convertTemp, convertSpeed, getTempColor } from '../utils/unitConversion';

describe('convertTemp', () => {
    it('returns rounded Celsius when isMetric is true', () => {
        expect(convertTemp(23.6, true)).toBe(24);
        expect(convertTemp(0, true)).toBe(0);
        expect(convertTemp(-5.3, true)).toBe(-5);
    });

    it('converts to Fahrenheit when isMetric is false', () => {
        expect(convertTemp(0, false)).toBe(32);
        expect(convertTemp(100, false)).toBe(212);
        expect(convertTemp(20, false)).toBe(68);
    });
});

describe('convertSpeed', () => {
    it('returns m/s when isMetric is true', () => {
        expect(convertSpeed(5, true)).toBe('5 m/s');
        expect(convertSpeed(3.7, true)).toBe('4 m/s');
    });

    it('converts to mph when isMetric is false', () => {
        expect(convertSpeed(1, false)).toBe('2 mph');
        expect(convertSpeed(10, false)).toBe('22 mph');
    });
});

describe('getTempColor', () => {
    it('returns icy blue for freezing temps', () => {
        expect(getTempColor(-5)).toBe('#60a5fa');
        expect(getTempColor(0)).toBe('#60a5fa');
    });

    it('returns cyan for cool temps', () => {
        expect(getTempColor(5)).toBe('#67e8f9');
    });

    it('returns green for mild temps', () => {
        expect(getTempColor(15)).toBe('#4ade80');
    });

    it('returns amber for warm temps', () => {
        expect(getTempColor(25)).toBe('#fbbf24');
    });

    it('returns orange for hot temps', () => {
        expect(getTempColor(35)).toBe('#f97316');
    });

    it('returns red for scorching temps', () => {
        expect(getTempColor(45)).toBe('#ef4444');
    });
});
