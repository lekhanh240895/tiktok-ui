import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0 0 0 / 40%);
    z-index: 99;
    display: flex;

    .modal {
        margin: auto;
        height: 100vh;
        max-width: calc(100vw - 32px);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: show 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

        @keyframes show {
            from {
                opacity: 0;
                transform: scale(0);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .modal_inner {
            margin: 32px 16px;
            background-color: #fff;
            height: 700px;
            width: 700px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .error--edit {
                padding: 16px;
                font-size: 2rem;
                margin-bottom: 0;
            }

            .modal_header {
                padding: 24px 24px 12px;
                border-bottom: 1px solid rgba(22, 24, 35, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;

                h1 {
                    display: flex;
                    align-items: center;
                    font-size: 2.4rem;
                    line-height: 3.6rem;
                    font-weight: 600;
                    font-family: var(--font-family);
                }

                span {
                    color: rgba(22, 24, 35, 0.75);
                    margin-right: 12px;
                    cursor: pointer;
                }
            }

            .form {
                flex: 1;
                display: flex;
                flex-direction: column;
                background-color: var(--white-color);
            }
            .modal_body {
                padding: 8px 24px 0;
                position: relative;

                & > div {
                    display: flex;
                    padding: 16px 0;

                    &:not(:last-child) {
                        border-bottom: 1px solid rgba(22, 24, 35, 0.2);
                    }

                    h2 {
                        width: 120px;
                        font-size: 1.6rem;
                        line-height: 2.4rem;
                        font-weight: 600;
                        font-family: var(--font-family);
                        flex-shrink: 0;
                        margin-right: 24px;
                    }

                    input,
                    textarea {
                        width: 360px;
                        height: 38px;
                        font-size: 1.6rem;
                        line-height: 24px;
                        background-color: rgba(22, 24, 35, 0.06);
                        caret-color: rgb(254 44 85);
                        padding: 7px 12px;
                        border-radius: 5px;

                        &:focus {
                            outline: rgba(22, 24, 35, 0.2) solid 1.5px;
                        }
                    }
                }

                .photo {
                    .img {
                        height: 100px;
                        display: flex;
                        justify-content: flex-end;
                        margin-left: 128px;
                        position: relative;

                        img {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                        }

                        .edit-icon {
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            background-color: var(--white-color);
                            border: 1px solid rgb(208, 208, 211);
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            cursor: pointer;
                        }
                    }
                }

                .bio {
                    padding: 16px 0 50px;
                    textarea {
                        height: 100px;
                        resize: none;
                    }
                    span {
                        display: block;
                        font-size: 1.2rem;
                        color: rgb(22 24 35 / 75%);
                    }
                }
            }

            .modal_body--crop {
                width: 100%;
                height: 100%;
                display: flex;
                background-color: #000;
                position: relative;
                padding: 24px 12px;

                .crop-wrapper {
                    margin: auto;
                    width: 360px;
                    height: 360px;
                    position: relative;
                    overflow: hidden;

                    .reactEasyCrop_Container {
                        img {
                            height: 100%;
                        }
                    }
                    .avatar-view {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        box-shadow: rgb(0 0 0 / 30%) 0px 0px 0px 250px;
                        pointer-events: none;
                    }
                }

                .slider-container {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 20px;
                    width: 360px;
                    display: flex;
                    align-items: center;

                    span {
                        color: #fff;
                        font-size: 1.4rem;
                        margin-right: 16px;
                    }
                    .zoom {
                        flex: 1;
                        &::-webkit-slider-thumb {
                            background-color: var(--primary-color);
                            height: 16px;
                            width: 16px;
                            border-radius: 50%;
                        }
                        &::-webkit-slider-runnable-track {
                            background-color: #fff;
                            height: 6px;
                        }
                    }
                }
            }

            .modal_footer {
                padding: 24px;
                border-top: 1px solid rgba(22, 24, 35, 0.2);
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
    }
`;
