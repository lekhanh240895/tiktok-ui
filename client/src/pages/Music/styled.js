import styled from 'styled-components';

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

export const ShareInfo = styled.div`
    display: flex;
    margin-bottom: 22px;
`;

export const ImageWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: 2px;

    .video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        object-fit: cover;
        opacity: 0;
    }

    .canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(50%);
    }

    .circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;

        svg {
            color: #fff;
            transform: rotate(-90deg);
        }
        .circle1 {
            --stroke-length: 225.8292694091797;
            --strokeIncrement: 0;
            --strokeCalc: 225.8292694091797;
            stroke-dasharray: var(--stroke-length);
            stroke-dashoffset: 0;
            transition: stroke-dashoffset 0.2s linear 0s;
        }

        .circle2 {
            --stroke-length: 225.8292694091797;
            --strokeIncrement: 0;
            --strokeCalc: 225.8292694091797;

            stroke-dasharray: var(--stroke-length);
            stroke-dashoffset: var(--strokeCalc);
            transition: stroke-dashoffset 0.2s linear 0s;
        }
    }

    .play-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        cursor: pointer;
        padding: 8px;
        z-index: 3;
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
    p {
        font-size: 1.6rem;
        line-height: 25px;
    }
`;

export const Bio = styled.p`
    margin-top: 10px;
`;

export const HeaderActions = styled.div`
    position: absolute;
    right: 0;
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
