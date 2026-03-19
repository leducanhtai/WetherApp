import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {
    it('renders nothing when error is null', () => {
        const { container } = render(<ErrorMessage error={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders error message text', () => {
        const error = { type: 'not-found', message: 'City not found' };
        render(<ErrorMessage error={error} />);
        expect(screen.getByText('City not found')).toBeInTheDocument();
    });

    it('renders retry button when onRetry is provided', () => {
        const error = { type: 'network', message: 'No internet' };
        const onRetry = jest.fn();
        render(<ErrorMessage error={error} onRetry={onRetry} />);
        expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
        const error = { type: 'generic', message: 'Error occurred' };
        const onRetry = jest.fn();
        render(<ErrorMessage error={error} onRetry={onRetry} />);
        screen.getByText('Retry').click();
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('does not render retry button when onRetry is not provided', () => {
        const error = { type: 'not-found', message: 'Not found' };
        render(<ErrorMessage error={error} />);
        expect(screen.queryByText('Retry')).not.toBeInTheDocument();
    });

    it('has alert role for accessibility', () => {
        const error = { type: 'generic', message: 'Error' };
        render(<ErrorMessage error={error} />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });
});
