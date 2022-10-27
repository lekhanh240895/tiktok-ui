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

        .privacy-select-container {
            position: relative;
            cursor: pointer;
            font-size: 1.6rem;
            width: 300px;

            .select-label {
                width: 100%;
                border: 1px solid rgba(22, 24, 35, 0.12);
                border-radius: 4px;
                padding: 0 16px;
                height: 36px;
                line-height: 36px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    &::first-letter {
                        text-transform: capitalize;
                    }
                }
                .icon {
                    transition: all 0.3s ease-out;
                    flex-shrink: 0;
                }
            }

            .select-list {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 110%;
                z-index: 99;
                background-color: var(--white-color);
                overflow: auto;
                border-radius: 4px 4px 0 0;
                box-shadow: 0px 2px 12px rgba(0 0 0 / 12%);
                max-height: 320px;
                display: none;
                animation: show 0.3s ease forwards;

                .select-option {
                    padding: 4px 12px;
                    line-height: 34px;
                    cursor: pointer;

                    &::first-letter {
                        text-transform: capitalize;
                    }

                    &:hover {
                        background-color: var(--main-background-color);
                    }
                }

                &::-webkit-scrollbar-thumb {
                    background-color: rgb(22 24 35 / 6%);
                }
            }

            &.show {
                .select-list {
                    display: block;
                }
                .select-label {
                    .icon {
                        transform: rotateZ(180deg);
                    }
                }
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
                cursor: pointer;

                &.active {
                    .switch-wrapper {
                        background-color: rgb(11 224 155);
                    }
                    .switch-inner {
                        left: 22px;
                    }
                }

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

        .copyright-check-desc {
            margin-top: 8px;
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            height: 38px;
            line-height: 38px;
            background-color: rgb(22 24 35 / 6%);
            border-radius: 4px;
            padding: 8px 12px;

            .info {
                color: var(--primary-color);
                margin-right: 4px;
            }
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
