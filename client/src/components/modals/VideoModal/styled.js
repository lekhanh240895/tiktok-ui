import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    .modal {
        height: 100vh;
        width: 100vw;
        animation: show 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

        @keyframes show {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .modal_inner {
            background-color: #fff;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .video-container {
            flex: 1;
            background-color: rgb(27 24 23);
            position: relative;

            .header {
                position: absolute;
                top: 20px;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                z-index: 1;
                padding: 0 20px;
                line-height: 0;

                .left {
                    display: flex;
                    align-self: center;

                    .delete-btn {
                        margin-right: 24px;
                        color: #fff;
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: rgb(255 255 255 / 12%);
                    }
                }
                .right {
                    background-color: rgb(255 255 255 / 12%);
                    color: var(--white-color);
                    border-radius: 20px;
                    font-size: 1.4rem;
                    padding: 10px 16px;
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    font-family: 'SofiaPro';

                    .report-icon {
                        margin-right: 5px;
                    }
                }
            }

            .body {
                flex: 1 1 896px;
                padding: 0 80px;
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;

                .video-layout {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    background-color: rgba(22, 24, 35, 0.06);
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .video-wrapper {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100%;
                    height: 100%;
                    .video {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }

                    &:hover > .video-controller-container {
                        opacity: 1;
                    }

                    .play-icon {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #fff;
                    }
                }

                .blur-background {
                    position: absolute;
                    width: 10%;
                    height: 10%;
                    filter: blur(2px);
                    left: 50%;
                    top: 50%;
                    transform: scale(11);
                    opacity: 0.3;
                    background: center center / cover no-repeat;
                }

                .updown-icon-group {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                    display: flex;
                    flex-direction: column;

                    .previous,
                    .next {
                        color: #fff;
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: rgb(255 255 255 / 12%);
                    }
                    .previous {
                        transform: rotateZ(180deg);
                        margin-bottom: 16px;
                    }
                }
                .volume-wrapper {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    color: #fff;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: rgb(255 255 255 / 12%);
                }

                .video-controller-container {
                    display: flex;
                    height: 24px;
                    max-width: 56.25vh;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    bottom: 28px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% - 32px);
                    padding: 0 16px;
                    opacity: 0;
                    transition: opacity 0.3s ease-out;
                    z-index: 1;
                }

                .progress-wrapper {
                    position: relative;
                    flex: 1 1 auto;
                    height: 24px;
                    width: 100%;

                    &:hover .progress {
                        height: 6px;
                    }
                    &:hover .progress-circle {
                        display: block;
                    }

                    &:hover .progress-bar {
                        height: 6px;
                    }

                    .progress {
                        width: 100%;
                        height: 4px;
                        background-color: rgb(255 255 255 / 20%);
                        position: absolute;
                        z-index: 99;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }

                    .progress-circle {
                        position: absolute;
                        border-radius: 50%;
                        height: 16px;
                        width: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #fff;
                        box-shadow: rgb(0 0 0 / 10%) -1px 1px 1px;
                        display: none;
                    }
                    .progress-bar {
                        height: 4px;
                        z-index: 1;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #fff;
                    }
                }

                .timer-container {
                    color: #fff;
                    max-width: 88px;
                    flex: 0 0 88px;
                    margin-left: 8px;
                    font-size: 1.4rem;
                    line-height: 24px;
                }
            }
        }
    }
`;
