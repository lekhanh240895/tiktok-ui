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

    .play-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;

        .user-info {
            display: flex;
            align-items: center;

            .avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: contain;
            }
            span {
                margin: 0 4px;
            }
        }

        .play-card {
            display: flex;
            align-items: center;

            span {
                margin: 0 4px;
            }
        }
    }
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

export const ShareOptionsWrapper = styled.div`
    width: 280px;
    position: relative;
    padding-top: 8px;
    max-height: 448px;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 12%) 0px 2px 12px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    &::after {
        content: '';
        position: absolute;
        height: 10px;
        top: -29px;
        right: 15px;
        border: 10px solid;
        border-color: transparent transparent var(--white-color) transparent;
    }
`;

export const ShareOptions = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
`;

export const MoreOptions = styled(ShareOptionsWrapper)`
    width: 180px;
`;

export const ShareMenuItem = styled.div`
    margin-left: 0 !important;
    padding: 0px 16px;

    &:hover {
        background-color: rgba(22, 24, 35, 0.03);
    }

    & > button {
        width: 100%;
        border: none;
        line-height: 22px;
        padding: 10px 0;
        justify-content: start;

        &:hover {
            background-color: unset;
        }
    }

    &:last-child {
        margin-bottom: 8px;
    }
`;

export const MoreShareItemButton = styled.div`
    margin-left: 0 !important;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: rgba(22, 24, 35, 0.03);
    }
`;

export const MoreMenuItem = styled(ShareMenuItem)`
    &:last-child {
        margin-bottom: 8px;
        button {
            border-top: 1px solid rgb(22 24 35 / 12%);
        }
    }
`;
