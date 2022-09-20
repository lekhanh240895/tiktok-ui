import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Scrollbar.css';

const Scrollbar = ({ children, className, ...props }) => {
    const contentRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const observer = useRef(ResizeObserver || null);
    const [thumbHeight, setThumbHeight] = useState(20);
    const [scrollStartPosition, setScrollStartPosition] = useState(null);
    const [initialScrollTop, setInitialScrollTop] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    function handleResize(ref, trackSize) {
        const { clientHeight, scrollHeight } = ref;
        setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
    }

    function handleScrollButton(direction) {
        const { current } = contentRef;
        if (current) {
            const scrollAmount = direction === 'down' ? 200 : -200;
            current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }

    const handleTrackClick = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const { current: trackCurrent } = scrollTrackRef;
            const { current: contentCurrent } = contentRef;
            if (trackCurrent && contentCurrent) {
                const { clientY } = e;
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const trackTop = rect.top;
                const thumbOffset = -(thumbHeight / 2);
                const clickRatio =
                    (clientY - trackTop + thumbOffset) /
                    trackCurrent.clientHeight;
                const scrollAmount = Math.floor(
                    clickRatio * contentCurrent.scrollHeight,
                );
                contentCurrent.scrollTo({
                    top: scrollAmount,
                    behavior: 'smooth',
                });
            }
        },
        [thumbHeight],
    );

    const handleThumbPosition = useCallback(() => {
        if (
            !contentRef.current ||
            !scrollTrackRef.current ||
            !scrollThumbRef.current
        ) {
            return;
        }
        const { scrollTop: contentTop, scrollHeight: contentHeight } =
            contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        let newTop = (+contentTop / +contentHeight) * trackHeight;
        newTop = Math.min(newTop, trackHeight - thumbHeight);
        const thumb = scrollThumbRef.current;
        thumb.style.top = `${newTop}px`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleThumbMousedown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current)
            setInitialScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    }, []);

    const handleThumbMouseup = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) {
                setIsDragging(false);
            }
        },
        [isDragging],
    );

    const handleThumbMousemove = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) {
                const {
                    scrollHeight: contentScrollHeight,
                    offsetHeight: contentOffsetHeight,
                } = contentRef.current;

                const deltaY =
                    (e.clientY - scrollStartPosition) *
                    (contentOffsetHeight / thumbHeight);
                const newScrollTop = Math.min(
                    initialScrollTop + deltaY,
                    contentScrollHeight - contentOffsetHeight,
                );

                contentRef.current.scrollTop = newScrollTop;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isDragging, scrollStartPosition, thumbHeight],
    );

    // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
    useEffect(() => {
        if (contentRef.current && scrollTrackRef.current) {
            const ref = contentRef.current;
            const { clientHeight: trackSize } = scrollTrackRef.current;
            observer.current = new ResizeObserver(() => {
                handleResize(ref, trackSize);
            });
            observer.current.observe(ref);
            ref.addEventListener('scroll', handleThumbPosition);
            return () => {
                observer.current?.unobserve(ref);
                ref.removeEventListener('scroll', handleThumbPosition);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Listen for mouse events to handle scrolling by dragging the thumb
    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);
        document.addEventListener('mouseleave', handleThumbMouseup);
        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
            document.removeEventListener('mouseleave', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    return (
        <div className="custom-scrollbars__container">
            <div
                className="custom-scrollbars__content"
                ref={contentRef}
                {...props}
            >
                {children}
            </div>

            <div className="custom-scrollbars__scrollbar">
                <button
                    className="custom-scrollbars__button"
                    onClick={() => handleScrollButton('up')}
                >
                    ⇑
                </button>
                <div className="custom-scrollbars__track-and-thumb">
                    <div
                        className="custom-scrollbars__track"
                        ref={scrollTrackRef}
                        onClick={handleTrackClick}
                        style={{ cursor: isDragging && 'grabbing' }}
                    ></div>
                    <div
                        className="custom-scrollbars__thumb"
                        ref={scrollThumbRef}
                        onMouseDown={handleThumbMousedown}
                        style={{
                            height: `${thumbHeight}px`,
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                    ></div>
                </div>
                <button
                    className="custom-scrollbars__button"
                    onClick={() => handleScrollButton('down')}
                >
                    ⇓
                </button>
            </div>
        </div>
    );
};

export default Scrollbar;
