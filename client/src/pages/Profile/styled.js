import styled from 'styled-components';
import Button from '~/components/Button';

export const Container = styled.div`
    position: relative;
    min-width: 520px;
`;

export const Header = styled.div`
    margin-bottom: 20px;
    padding-right: 92px;
    position: relative;
    max-width: 624px;
`;

export const SharedInfo = styled.div`
    display: flex;
    margin-bottom: 22px;

    img {
        width: 116px;
        height: 116px;
        border-radius: 50%;
    }
`;

export const ShareTitle = styled.div`
    margin-left: 20px;
    h2 {
        font-weight: 700;
        font-size: 3.2rem;
        line-height: 38px;
        margin-bottom: 4px;
        svg {
            margin-left: 12px;
        }
    }
    h4 {
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 25px;
        margin-bottom: 20px;
    }
`;

export const UserStats = styled.span`
    margin-right: 20px;
    span {
        font-weight: 700;
        font-size: 1.8rem;
        margin-right: 6px;
    }
`;

export const Bio = styled.p`
    margin-top: 10px;
`;

export const HeaderActions = styled.div`
    position: absolute;
    right: 52px;
    top: 12px;
    display: flex;

    @media (max-width: 768px) {
        right: 12px;
    }

    .share-icon {
        margin-right: 20px;

        svg {
            color: var(--white-color);
        }
    }

    span {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
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

export const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
`;

export const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const VideoTitle = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 21px;
    font-size: 1.4rem;
`;
export const NavList = styled.ul`
    position: relative;
    display: flex;
    align-items: stretch;
    width: 460px;

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
    width: 50%;
    transform: translateX(0);
    bottom: 0;
    left: 0;
    background-color: rgb(22 24 35);
    transition: all 0.3s ease-in;
`;

export const StyledButton = styled(Button)`
    min-width: 164px;
    padding: 6px 16px;

    span[class*='title'] {
        font-size: 1.8rem;
        line-height: 22px;
        font-weight: 600;
        font-family: 'SofiaPro', sans-serif;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FriendIconWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    border: 1px solid rgb(227 227 228);
    margin-left: 8px;
    cursor: pointer;
`;
