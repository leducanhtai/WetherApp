import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onLocate }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) onSearch(city.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <div className="search-bar">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    aria-label="Search city"
                />
                {onLocate && (
                    <button
                        type="button"
                        className="locate-btn"
                        onClick={onLocate}
                        aria-label="Use my location"
                        title="Use my location"
                    >
                        <MapPin size={18} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
