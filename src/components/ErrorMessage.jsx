import React from 'react';
import { CloudOff, WifiOff, MapPin, AlertTriangle } from 'lucide-react';

const icons = {
    'not-found': CloudOff,
    network: WifiOff,
    geo: MapPin,
    generic: AlertTriangle,
};

const ErrorMessage = ({ error, onRetry }) => {
    if (!error) return null;
    const Icon = icons[error.type] || AlertTriangle;

    return (
        <div className="error-banner" role="alert">
            <Icon size={22} className="error-banner-icon" />
            <span className="error-banner-text">{error.message}</span>
            {onRetry && (
                <button className="error-banner-btn" onClick={onRetry}>
                    Retry
                </button>
            )}
        </div>
    );
};

export default React.memo(ErrorMessage);
