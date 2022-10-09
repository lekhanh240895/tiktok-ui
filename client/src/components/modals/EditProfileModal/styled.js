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

            .modal_header {
                padding: 24px 24px 12px;
                border-bottom: 1px solid rgba(22, 24, 35, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;

                h1 {
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

            .modal_body {
                padding: 8px 24px 0;

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

                .username {
                    input {
                    }
                }

                .name {
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

            .modal_footer {
                flex: 1;
                padding: 0 24px;
                border-top: 1px solid rgba(22, 24, 35, 0.2);
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
    }
`;
