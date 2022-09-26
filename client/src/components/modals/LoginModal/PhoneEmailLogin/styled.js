import styled from 'styled-components';

export const Wrapper = styled.div`
    .description {
        color: rgb(22, 24, 35);
        font-weight: 600;
        font-size: 15px;
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

        .forgot-btn {
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 18px;
            margin-top: 2px;
            color: rgba(22, 24, 35, 0.75);
        }

        .login-btn {
            width: 100%;
            padding: 13px 16px;
            margin-top: 24px;
        }
    }
`;
