import styled from 'styled-components';

export const Wrapper = styled.li`
    &.conversation-item--active {
        background-color: rgb(248 248 248);
    }
    padding: 0 24px;
    height: 72px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar-wrapper {
        position: relative;

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
            }
            .conversation-time {
                flex-shrink: 0;
                color: rgb(22 24 35 / 40%);
            }
        }
    }
`;
