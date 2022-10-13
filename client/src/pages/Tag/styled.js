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

export const SharedInfo = styled.div`
    display: flex;
    margin-bottom: 22px;
`;

export const ImageWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 2px;

    img {
        width: 100%;
        height: 100%;
    }

    h4 {
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--white-color);
        line-height: 25px;
        text-align: center;
    }
`;

export const TagnameWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 2px;

    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid rgba(22, 24, 35, 0.12);
    background-color: rgba(22, 24, 35, 0.03);
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
    right: 12px;
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
