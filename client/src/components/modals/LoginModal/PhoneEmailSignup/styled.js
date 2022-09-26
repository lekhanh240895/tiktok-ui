import styled from 'styled-components';

export const Wrapper = styled.div`
    .title {
        font-weight: 600;
        font-size: 1.6rem;
        margin-bottom: 5px;
        line-height: 22px;
    }

    .age-select {
        display: flex;
        margin-bottom: 8px;

        .select-container {
            background-color: rgba(22, 24, 35, 0.06);
            border-radius: 4px;
            position: relative;
            cursor: pointer;

            .select-label {
                padding: 0 12px;
                width: 120px;
                height: 44px;
                font-size: 1.6rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: rgba(22, 24, 35, 0.34);

                .icon {
                    color: var(--text-color);
                    transition: all 0.3s ease 0s;
                }
            }

            & + .select-container {
                margin-left: 8px;
            }

            .select-list {
                position: absolute;
                left: 0;
                right: 0;
                top: 50px;
                z-index: 12;
                transition: display 0.3s ease-out;
                background-color: var(--white-color);
                width: 120px;
                overflow: auto;
                border-radius: 4px;
                box-shadow: 0px 2px 12px rgba(0 0 0 / 12%);
                max-height: 320px;
                display: none;

                .select-option {
                    padding: 0 12px;
                    line-height: 34px;

                    &:hover {
                        background-color: var(--main-background-color);
                    }
                }

                &::-webkit-scrollbar-thumb {
                    background-color: rgb(22 24 35 / 6%);
                }
            }
        }
    }

    .div-desc {
        font-size: 1.4rem;
        color: rgba(22, 24, 35, 0.5);
        line-height: 20px;
        margin-bottom: 16px;
    }

    .description {
        color: rgb(22, 24, 35);
        font-weight: 600;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        line-height: 22px;

        .styled-link {
            color: rgba(22, 24, 35, 0.75);
            font-weight: 600;
            font-size: 12px;
            display: inline-block;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .form {
        display: flex;
        flex-direction: column;

        .form-group {
            position: relative;
            margin-bottom: 9px;

            input {
                width: 100%;
                height: 44px;
                line-height: 100%;
                padding-inline-start: 12px;
                border-radius: 4px;
                background-color: rgba(22, 24, 35, 0.06);
                border: 1px solid rgba(22, 24, 35, 0.12);
                font-size: 1.6rem;
                caret-color: var(--primary-color);

                &:placeholder-shown {
                    color: rgba(22, 24, 35, 0.6);
                }
            }
        }

        .submit-btn {
            width: 100%;
            padding: 13px 16px;
            margin-top: 24px;
        }
    }
`;
