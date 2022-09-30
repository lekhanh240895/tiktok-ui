import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 1100px;
    margin: 16px auto;
    background-color: var(--white-color);
    padding: 24px 56px;
    border-radius: 8px;

    .header {
        .heading {
            font-family: var(--font-family);
            font-weight: 700;
        }
        .desc {
            font-size: 1.8rem;
            color: rgb(22 24 35 / 50%);
        }
    }

    .body {
        display: flex;
        margin: 24px 0 130px;

        .left-body {
            margin-top: 24px;
            border: 2px dashed rgb(22 24 35 / 20%);
            width: 260px;
            height: 460px;
            padding: 0 35px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 8px;

            .title {
                font-size: 1.8rem;
                font-weight: 600;
                margin-top: 24px;
            }

            .sub-title {
                font-size: 1.4rem;
                color: rgba(22 24 35 / 75%);
                margin: 4px 0 24px;
            }

            .video-info {
                text-align: center;
                font-size: 1.4rem;
                color: rgb(22 24 35 / 50%);
                margin-bottom: 32px;

                div {
                    margin-bottom: 6px;
                }
            }
            .select-btn {
                min-width: 186px;
                border-radius: 2px;
            }

            &:hover {
                border-color: var(--primary-color);
                background-color: var(--main-background-color);
            }
        }

        .right-body {
            flex: 1;
            margin-left: 24px;

            .form-group {
                margin-bottom: 24px;

                .title {
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 4px;

                    .limited {
                        font-size: 1.3rem;
                        line-height: 1.7rem;
                        color: rgba(22 24 35 / 50%);
                    }
                }

                .input-container {
                    min-height: 46px;
                    position: relative;
                    text-align: center;
                    border: 1px solid rgba(22, 24, 35, 0.12);
                    border-radius: 4px;
                    overflow: auto;
                    white-space: pre-wrap;
                    overflow-wrap: break-word;

                    .caption-input {
                        width: 100%;
                        padding: 12px 80px 12px 16px;
                        font-size: 1.5rem;
                        min-height: 46px;
                    }

                    .hashtag {
                        position: absolute;
                        right: 20px;
                        top: 8px;

                        span {
                            font-size: 2rem;
                            font-weight: 700;
                            margin: 8px;
                        }
                    }
                }

                .bg-container {
                    width: 100%;
                    padding: 6px;
                    border: 1px solid rgba(22, 24, 35, 0.12);

                    .bg-empty {
                        width: 100px;
                        height: 150px;
                        object-fit: cover;
                        background-color: rgba(22 24 35 / 3%);
                    }
                }

                .privacy-select {
                    width: 300px;
                    padding: 6px 12px;
                    font-size: 1.6rem;
                    line-height: 22px;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background: transparent;
                    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                    background-repeat: no-repeat;
                    background-position-x: 98%;
                    background-position-y: 5px;
                    border: 1px solid rgba(22 24 35 / 12%);
                    border-radius: 4px;
                }

                .checkbox-container {
                    display: flex;

                    .checkbox {
                        display: flex;
                        align-items: center;
                        min-height: 24px;
                        position: relative;
                        padding-left: 24px;
                        margin-right: 32px;

                        .checkbox-input {
                            appearance: none;

                            &:checked ~ .checkmark:after {
                                display: block;
                            }

                            &:checked ~ .checkmark {
                                background-color: var(--primary-color);
                            }
                        }

                        .checkmark {
                            position: absolute;
                            top: 3px;
                            left: 0;
                            height: 16px;
                            width: 16px;
                            border: 1px solid rgb(22 24 35 / 12%);

                            &:hover {
                                border: 1.5px solid rgb(234 40 78);
                            }

                            &:after {
                                content: '';
                                position: absolute;
                                left: 4px;
                                top: 0px;
                                width: 3px;
                                height: 8px;
                                border: solid var(--white-color);
                                border-width: 0 3px 3px 0;
                                transform: rotate(45deg);
                                display: none;
                            }
                        }
                    }
                }

                .title.title-copyright {
                    justify-content: start;

                    .copyright {
                        margin-right: 14px;
                    }

                    .switch {
                        justify-self: start;
                        position: relative;
                        overflow: visible;
                        display: inline-flex;
                        align-items: center;
                        color: rgb(22, 24, 35);
                        cursor: pointer;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 22px;

                        .switch-wrapper {
                            position: relative;
                            width: 44px;
                            height: 24px;
                            padding: 2px;
                            left: 0px;
                            top: 0px;
                            background: rgba(22, 24, 35, 0.12);
                            border-radius: 22px;
                            transition: all 1s
                                cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
                            cursor: pointer;
                        }

                        .switch-inner {
                            position: absolute;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 20px;
                            height: 20px;
                            left: 2px;
                            top: 50%;
                            transform: translateY(-50%);
                            border-radius: 22px;
                            background: rgb(255, 255, 255);
                            box-shadow: rgb(0 0 0 / 15%) 0px 1px 2px;
                            transition: all 0.4s
                                cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
                            z-index: 2;
                        }
                    }
                }

                .copyright-desc {
                    font-size: 1.2rem;
                    color: rgba(22 24 35 / 75%);
                    margin-top: 12px;
                }
            }

            .button-group {
                margin-top: 24px;
                .action-btn {
                    min-width: 160px;
                    padding: 14px 16px;
                }
            }
        }
    }
`;
