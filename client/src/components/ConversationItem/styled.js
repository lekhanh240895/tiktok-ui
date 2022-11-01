import styled from 'styled-components';

export const Wrapper = styled.li`
    padding: 0 24px;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .avatar-wrapper {
        position: relative;
        flex-shrink: 0;

        .online-circle {
            position: absolute;
            right: 2px;
            bottom: 0px;
            margin-left: 5px;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #31a24c;
            box-shadow: 0 0 0 2px #fff;
        }
    }

    .conversation-content-wrapper {
        margin-left: 12px;
        flex: 1;
        .conversation-user {
            font-family: var(--font-family);
            line-height: 22px;
            font-weight: 600;
            max-width: 224px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .conversation-content {
            display: flex;
            max-width: 224px;
            line-height: 20px;
            font-size: 1.4rem;
            color: rgb(22 24 35 / 75%);
            padding-top: 5px;
            .conversation-text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 5px;

                &.unread {
                    font-weight: 700;
                }
            }
            .conversation-time {
                flex-shrink: 0;
                color: rgb(22 24 35 / 40%);
            }
        }
    }
    .option-icon {
        align-self: center;
        transform: rotate(90deg);
        opacity: 0;
        transition: all 0.3s ease;
    }

    &.conversation-item--active {
        background-color: rgb(248 248 248);
    }
    &:hover .option-icon {
        opacity: 1;
    }
`;
