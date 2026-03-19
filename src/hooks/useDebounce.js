import { useRef, useCallback } from 'react';

const useDebounce = (callback, delay = 400) => {
    const timerRef = useRef(null);

    const debouncedFn = useCallback(
        (...args) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay],
    );

    const cancel = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    return [debouncedFn, cancel];
};

export default useDebounce;
