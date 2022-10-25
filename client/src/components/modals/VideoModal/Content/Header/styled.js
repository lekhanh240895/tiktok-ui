import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 32px 32px 16px;

    .user-info {
        display: flex;
        align-items: center;
        padding: 22px 0 15px;

        .info {
            margin-left: 12px;
            margin-right: 12px;
            flex: 1;
            h4 {
                font-size: 1.8rem;
                line-height: 25px;
                font-weight: 700;
                .check {
                    margin-left: 5px;
                }
            }
            p {
                font-size: 1.4rem;
                line-height: 20px;
            }
        }
        .option-icon-wrapper {
            transform: rotate(90deg);
        }

        .follow-btn {
            min-width: 106px;
            padding: 8px 16px;
        }
    }

    .music {
        margin: 10px 0 16px;
        line-height: 22px;
        font-weight: 700;
        padding: 0;
    }
    .video-info {
        padding: 16px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .like-comment {
            display: flex;
            align-items: center;

            .likes,
            .comments {
                display: flex;
                align-items: center;
                margin-right: 20px;
                cursor: pointer;

                .icon-wrapper-circle.liked {
                    color: var(--primary-color);
                }

                .likes-number,
                .comments-number {
                    font-size: 1.2rem;
                    line-height: 1.7rem;
                    margin-left: 6px;
                    font-weight: 700;
                    color: rgba(22 24 35 / 75%);
                }
            }
        }
        .share-group {
            display: flex;
            align-items: center;
            height: 32px;
            .share-item {
                cursor: pointer;
                line-height: 0;
                margin-right: 8px;
            }
            .share-icon {
                width: 2.4rem;
                height: 2.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .share-option-wrapper {
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
                    border-color: transparent transparent var(--white-color)
                        transparent;
                }
                .share-options {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: auto;
                }
                .share-option {
                    & > button {
                        width: 100%;
                        border: none;
                        line-height: 22px;
                        padding: 10px 16px;
                        justify-content: start;

                        &:hover {
                            background-color: rgba(22, 24, 35, 0.03);
                        }
                    }

                    &:last-child {
                        margin-bottom: 8px;
                    }
                }
            }
        }
    }
    .copylink-container {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        color: rgb(22 24 35 / 75%);
        border-radius: 2px;
        border: 1px solid rgb(22 24 35 / 12%);
        background-color: rgba(22, 24, 35, 0.06);
        height: 34px;

        .copylink-text {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 34px;
            padding-left: 12px;
        }
        .copy-btn {
            font-size: 1.4rem;
            height: 100%;
            line-height: 34px;
            cursor: pointer;
            font-weight: 700;
            color: rgb(22 24 35);
            padding: 0 18px;
        }
    }
`;
