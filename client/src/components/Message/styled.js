import styled from 'styled-components';

export const Wrapper = styled.li`
    display: flex;
    flex-direction: column;

    &:last-child {
        margin-bottom: 8px;
    }

    .message-item {
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-start;
        margin: 8px 12px;
        position: relative;

        &:hover .message-option {
            display: block;
        }

        .message-container {
            background-color: rgb(22 24 35 / 6%);
            margin: 0 8px;
            max-width: 360px;
            overflow: hidden;
            word-break: break-word;
            white-space: pre-line;
            font-size: 1.6rem;
            line-height: 22px;
            border: 1px solid rgb(22 24 35 / 12%);
            padding: 7px 12px;
            border-radius: 8px;
            position: relative;
        }

        .message-option-tippy {
            span {
                margin: 0 8px;

                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .message-option {
            transform: rotate(90deg);
            width: 2.4rem;
            height: 2.4rem;
            margin: 9px 16px 0;
            display: none;
            cursor: pointer;
        }
    }

    .message-item--their-message {
        flex-direction: row;
    }

    .like-container {
        float: right;
        display: flex;
        justify-content: flex-end;
        margin: -3px 64px 8px 0;

        .avatar-wrapper {
            margin-right: 2px;
        }

        .like-icon {
            color: var(--primary-color);
            margin-right: 4px;
        }
    }
    .like-container--their-message {
        justify-content: flex-start;
        margin: -3px 0 8px 50px;
    }
`;
