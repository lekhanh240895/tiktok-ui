import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    min-width: 520px;
`;

export const VideoList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(184px, 1fr));
    gap: 24px 16px;
    width: 100%;
`;

export const VideoItem = styled.li`
    margin-top: 10px;
    height: 100%;
    width: 100%;
    cursor: pointer;
`;

export const NavList = styled.ul`
    position: relative;
    display: flex;
    align-items: stretch;
    width: 690px;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        background-color: rgb(22 24 35 / 20%);
    }
`;
export const NavItem = styled.li`
    min-width: 230px;
    height: 44px;
    font-size: 1.8rem;
    line-height: 25px;
    font-weight: 600;
    text-align: center;

    cursor: pointer;
    color: ${(props) =>
        props.active ? 'var(--text-color) ' : 'rgb(18 18 18 / 50%)'};
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Line = styled.div`
    position: absolute;
    height: 2px;
    width: 33.33%;
    transform: translateX(0);
    bottom: 0;
    left: 0;
    background-color: rgb(22 24 35);
    transition: all 0.3s ease-in;
`;
