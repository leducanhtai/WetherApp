import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => (
    <div className="dashboard-grid skeleton-grid">
        <div className="skeleton-card skeleton-lg">
            <div className="skeleton-line skeleton-w60" />
            <div className="skeleton-line skeleton-w40" />
            <div className="skeleton-block" />
            <div className="skeleton-row">
                <div className="skeleton-pill" />
                <div className="skeleton-pill" />
                <div className="skeleton-pill" />
            </div>
        </div>
        <div className="skeleton-card skeleton-lg">
            <div className="skeleton-line skeleton-w50" />
            <div className="skeleton-line skeleton-w30" />
            <div className="skeleton-block" />
        </div>
        <div className="skeleton-card-group">
            <div className="skeleton-card skeleton-sm">
                <div className="skeleton-line skeleton-w80" />
                <div className="skeleton-line skeleton-w40" />
            </div>
            <div className="skeleton-card skeleton-sm">
                <div className="skeleton-line skeleton-w60" />
                <div className="skeleton-block skeleton-block-sm" />
            </div>
            <div className="skeleton-card skeleton-sm">
                <div className="skeleton-line skeleton-w50" />
                <div className="skeleton-line skeleton-w70" />
            </div>
        </div>
        <div className="skeleton-card skeleton-wide">
            <div className="skeleton-line skeleton-w40" />
            <div className="skeleton-block" />
        </div>
        <div className="skeleton-card skeleton-md">
            <div className="skeleton-line skeleton-w30" />
            <div className="skeleton-block" />
        </div>
        <div className="skeleton-card skeleton-md">
            <div className="skeleton-line skeleton-w50" />
            <div className="skeleton-line skeleton-w80" />
            <div className="skeleton-line skeleton-w80" />
            <div className="skeleton-line skeleton-w80" />
        </div>
    </div>
);

export default React.memo(SkeletonLoader);
