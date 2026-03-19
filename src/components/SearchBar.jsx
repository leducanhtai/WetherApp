import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Search, MapPin } from 'lucide-react';
import { fetchCitySuggestions } from '../api/weatherService';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocate }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef(null);
    const debounceRef = useRef(null);

    const fetchSuggestions = useCallback(async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const results = await fetchCitySuggestions(query);
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
        } catch {
            setSuggestions([]);
        }
    }, []);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        if (city.trim().length >= 2) {
            debounceRef.current = setTimeout(() => fetchSuggestions(city.trim()), 350);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        return () => clearTimeout(debounceRef.current);
    }, [city, fetchSuggestions]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectSuggestion = (item) => {
        const display = item.state
            ? `${item.name}, ${item.state}, ${item.country}`
            : `${item.name}, ${item.country}`;
        setCity(display);
        setShowSuggestions(false);
        setSuggestions([]);
        setActiveIndex(-1);
        onSearch(item.name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
            selectSuggestion(suggestions[activeIndex]);
        } else if (city.trim()) {
            onSearch(city.trim());
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-container" ref={containerRef}>
            <div className="search-bar">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setActiveIndex(-1);
                    }}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    aria-label="Search city"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={showSuggestions}
                    aria-autocomplete="list"
                    aria-controls="autocomplete-listbox"
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
            {showSuggestions && suggestions.length > 0 && (
                <ul className="autocomplete-list" role="listbox" id="autocomplete-listbox">
                    {suggestions.map((item, index) => (
                        <li
                            key={`${item.name}-${item.lat}-${item.lon}`}
                            className={`autocomplete-item${index === activeIndex ? ' active' : ''}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            onMouseDown={() => selectSuggestion(item)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <MapPin size={14} className="autocomplete-icon" />
                            <span className="autocomplete-name">{item.name}</span>
                            {item.state && (
                                <span className="autocomplete-state">, {item.state}</span>
                            )}
                            <span className="autocomplete-country">{item.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onLocate: PropTypes.func,
};

export default SearchBar;
