import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

// Mock the API
jest.mock('../api/weatherService', () => ({
    fetchCitySuggestions: jest.fn(() => Promise.resolve([])),
}));

describe('SearchBar', () => {
    it('renders search input', () => {
        render(<SearchBar onSearch={jest.fn()} />);
        expect(screen.getByPlaceholderText('Search city...')).toBeInTheDocument();
    });

    it('calls onSearch when form is submitted with text', () => {
        const onSearch = jest.fn();
        render(<SearchBar onSearch={onSearch} />);
        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.change(input, { target: { value: 'London' } });
        fireEvent.submit(input.closest('form'));
        expect(onSearch).toHaveBeenCalledWith('London');
    });

    it('does not call onSearch when input is empty', () => {
        const onSearch = jest.fn();
        render(<SearchBar onSearch={onSearch} />);
        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.submit(input.closest('form'));
        expect(onSearch).not.toHaveBeenCalled();
    });

    it('renders locate button when onLocate is provided', () => {
        render(<SearchBar onSearch={jest.fn()} onLocate={jest.fn()} />);
        expect(screen.getByLabelText('Use my location')).toBeInTheDocument();
    });

    it('calls onLocate when locate button is clicked', () => {
        const onLocate = jest.fn();
        render(<SearchBar onSearch={jest.fn()} onLocate={onLocate} />);
        fireEvent.click(screen.getByLabelText('Use my location'));
        expect(onLocate).toHaveBeenCalledTimes(1);
    });

    it('has proper aria attributes for combobox pattern', () => {
        render(<SearchBar onSearch={jest.fn()} />);
        const input = screen.getByRole('combobox');
        expect(input).toHaveAttribute('aria-autocomplete', 'list');
        expect(input).toHaveAttribute('aria-controls', 'autocomplete-listbox');
    });
});
