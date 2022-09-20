import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { TopArrowIcon } from '~/components/Icons/index';

export default function BottomContainer() {
    const [showScrollTopArrow, setShowScrollTopArrow] = useState(false);

    const handleScroll = () => {
        if (document.documentElement.scrollTop > 100 || window.scrollY > 100) {
            setShowScrollTopArrow(true);
        } else {
            setShowScrollTopArrow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scorll', handleScroll);
        };
    });

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Container show={showScrollTopArrow}>
            <PromotionButton rounded>Get app</PromotionButton>

            <ScrollTopButton onClick={handleScrollTop}>
                <TopArrowIcon width="1.6rem" height="1.6rem" />
            </ScrollTopButton>
        </Container>
    );
}

const Container = styled.div`
    position: fixed;
    bottom: 0;
    right: 24px;
    display: flex;
    z-index: 9;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 12px;
    transition: 0.4s cubic-bezier(0.65, 0, 0.35, 1);
    transform: ${(props) =>
        props.show ? 'translateY(0)' : 'translateY(44px)'};
`;

const PromotionButton = styled(Button)`
    padding: 6px 16px;
    min-width: 90px;
    margin-bottom: 12px;
`;

const ScrollTopButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: var(--white-color);
    cursor: pointer;

    &:hover {
        background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.06),
                rgba(0, 0, 0, 0.06)
            ),
            #fe2c55;
    }
`;
