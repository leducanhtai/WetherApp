import React from 'react';
import { render } from '@testing-library/react';
import SkeletonLoader from '../components/SkeletonLoader';

describe('SkeletonLoader', () => {
    it('renders skeleton grid', () => {
        const { container } = render(<SkeletonLoader />);
        expect(container.querySelector('.skeleton-grid')).toBeInTheDocument();
    });

    it('renders skeleton cards', () => {
        const { container } = render(<SkeletonLoader />);
        const cards = container.querySelectorAll('.skeleton-card');
        expect(cards.length).toBeGreaterThan(0);
    });

    it('renders shimmer animation elements', () => {
        const { container } = render(<SkeletonLoader />);
        const lines = container.querySelectorAll('.skeleton-line');
        expect(lines.length).toBeGreaterThan(0);
    });
});
