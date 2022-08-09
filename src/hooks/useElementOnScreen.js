import { useEffect, useRef, useState } from 'react';

export const useElementOnScreen = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        const ref = containerRef.current;

        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};
