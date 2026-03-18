import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) onSearch(city);
    };

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search anything ..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Search className="search-icon" size={20} />
            </div>
        </form>
    );
};

export default SearchBar;
