import styled from 'styled-components';

export const Wrapper = styled.div`
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

            .label {
                display: flex;
                align-items: center;
            }

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

            .tag-user {
                color: var(--primary-color);
            }

            .input {
                width: 100%;
                padding: 12px 80px 12px 16px;
                font-size: 1.5rem;
                min-height: 46px;
                caret-color: var(--primary-color);
                overflow: auto;
                white-space: pre-wrap;
                overflow-wrap: break-word;
            }

            .search-input {
                padding: 12px 40px;
                caret-color: unset;
            }

            .hashtag {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;

                .hash,
                .tag {
                    font-weight: 700;
                    margin: 4px 6px;
                    cursor: pointer;
                }
            }

            .search-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
            }

            .close-icon {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }

            .select-container {
                position: absolute;
                bottom: -231px;
                left: 0;
                right: 0;
                height: 230px;
                overflow: auto;
                box-shadow: rgb(34 90 89 / 20%) 2px 0px 20px -20px,
                    rgb(34 90 89 / 20%) 0px 8px 20px -2px,
                    rgb(34 90 89 / 20%) 0px 0px 20px -20px;
                border-radius: 0 0 4px 4px;
                z-index: 999;
                background-color: var(--white-color);
                display: grid;
                grid-auto-columns: minmax(0, 1fr);
                grid-auto-flow: column;
                padding: 20px 0;
                column-gap: 10px;
                .select-column {
                    .select-title {
                        font-size: 1.5rem;
                        color: rgb(22 24 35 / 50%);
                        line-height: 18px;
                        text-align: start;
                        margin-bottom: 8px;
                        margin-left: 24px;
                    }
                    .select-list {
                    }
                    .select-item {
                        padding: 10px 24px;
                        cursor: pointer;
                        &:hover {
                            background-color: rgb(248, 248, 248);
                            transition: background-color 0.4s
                                cubic-bezier(0.27, 1.27, 0.48, 0.56) 0s;
                        }
                        display: flex;
                        .avatar-wrapper {
                            width: 48px;
                            height: 48px;
                            flex-shrink: 0;
                        }
                        .user-info {
                            margin-left: 12px;
                            overflow: hidden;
                            text-align: start;

                            .name {
                                font-size: 1.7rem;
                                font-weight: 700;
                                font-family: var(--font-family);
                                line-height: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .username {
                                font-weight: 400;
                                font-size: 1.4rem;
                                color: rgba(22 24 35 / 50%);
                                line-height: 18px;
                                margin-top: 3px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }

        .bg-container {
            width: 100%;
            padding: 6px;
            border: 1px solid rgba(22, 24, 35, 0.12);
            position: relative;

            .thumbnails {
                display: flex;
                border: 2px solid rgba(22, 24, 35, 0.12);
                border-radius: 2px;
                max-width: 680px;
                overflow: auto;

                &::-webkit-scrollbar {
                    height: 8px;
                }

                &::-webkit-scrollbar-thumb:horizontal {
                    background-color: rgba(0, 0, 0, 0.15);
                }

                .thumbnail {
                    height: 150px;
                    object-fit: cover;
                    cursor: pointer;
                }
            }

            .choosen {
                cursor: grab;
                position: absolute;
                top: 0px;
                left: 0px;
                box-sizing: content-box;
                border: 6px solid rgb(255, 255, 255);
                box-shadow: rgb(34 90 89 / 20%) 2px 4px 20px;
                border-radius: 8px;

                .choosen-thumbnail {
                    width: 100px;
                    height: 150px;
                    object-fit: cover;
                }
            }

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

            &:focus {
                outline: none;
            }
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
                cursor: pointer;

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
                    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
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
                    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
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
`;
