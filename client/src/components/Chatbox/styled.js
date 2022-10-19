import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .chatbox-header {
        padding: 16px;
        display: flex;
        align-items: center;
        border-bottom: 0.5px solid rgba(22, 24, 35, 0.12);

        .chat-user-info {
            margin-left: 12px;
            .chat-user__name {
                font-size: 1.8rem;
                font-family: var(--font-family);
                font-weight: 700;
                line-height: 24px;

                .check {
                    margin-left: 5px;
                    margin-bottom: 2px;
                }
            }
            .chat-user__username {
                font-family: var(--font-family);
                line-height: 22px;
                margin-top: 2px;
            }
        }
    }

    .messages-wrapper {
        flex: 1;
        padding: 24px 0 16px;
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
        overflow-y: auto;
    }

    .chatbox-bottom {
        background-color: #fff;
        padding: 13px 16px 13px;
        border-top: 0.5px solid rgba(22, 24, 35, 0.12);

        .add-message-form {
            display: flex;
            width: 100%;
        }

        .form-group {
            flex: 1;
            position: relative;
            background-color: rgba(22, 24, 35, 0.06);
            border: 1px solid transparent;
            padding: 7px 16px;
            border-radius: 8px;
            height: 40px;

            .form-control {
                background-color: transparent;
                min-height: 17px;
                width: 100%;
                caret-color: var(--primary-color);
                font-size: 1.5rem;
                color: rgb(22 24 35 / 75%);
            }

            .emoji-button {
                width: 32px;
                height: 32px;
                position: absolute;
                right: 11px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
            }
        }
        .post-message-btn {
            min-width: 48px;
            background-color: transparent;
            color: var(--primary-color);
            padding: 0;
            height: 40px;
            padding-top: 3px;
            padding-left: 4px;
        }
    }
`;
