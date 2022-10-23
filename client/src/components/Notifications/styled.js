import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .notifications-header {
        padding: 16px 0 0 16px;
        flex-shrink: 0;

        .notifications-header__title {
            font-weight: 700;
            font-size: 2.4rem;
            line-height: 28px;
        }
        .notifications-header__bar {
            display: flex;
            flex-wrap: wrap;
            margin-top: 16px;
            font-size: 1.4rem;
            line-height: 20px;
        }
        .notifications-header__item {
            background-color: rgb(22 24 35 / 6%);
            border-radius: 999px;
            padding: 2px 8px;
            margin-bottom: 12px;
            transition: all 0.3s ease;
            font-weight: 600;
            cursor: pointer;

            &:not(:last-child) {
                margin-right: 8px;
            }
        }
        .notifications-header__item--active {
            background-color: rgb(22 24 35);
            color: #fff;
        }
    }
    .notifications-body {
        flex: 1;
        overflow-y: auto;

        &::-webkit-scrollbar-thumb {
            background-color: rgb(22 24 35 / 8%);
        }

        .time-group {
            font-size: 1.4rem;
            color: rgb(22 24 35 / 80%);
            line-height: 20px;
            margin-top: 8px;
            padding: 0 16px;
        }
        .notification-list {
        }
        .notification-item {
            padding: 10px 16px;
            display: flex;
            cursor: pointer;

            &:hover {
                background-color: rgb(22 24 35 / 3%);
            }

            .notification-content {
                margin: 0 12px;
                flex: 1;
                font-size: 1.4rem;
                line-height: 17px;

                .notification-content_username {
                    font-family: var(--font-family);
                    font-weight: 600;
                    line-height: 17px;
                    .check {
                        margin-left: 4px;
                    }
                }
                .notification-desc {
                    color: rgb(22 24 35 / 50%);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-word;
                    max-height: 70px;
                }
                .notification-time {
                    margin: 0 5px;
                }
                .notification-desc__comment {
                    color: rgb(22 24 35 / 50%);
                    display: block;
                    margin-top: 4px;
                    padding-left: 8px;
                    border-left: 1px solid rgb(22 24 35 / 50%);
                }
                .notification-desc__mention {
                    display: inline-block;
                }
            }

            .notification-follow-btn {
                height: 29px;
                padding: 8px;
                align-self: center;
                min-width: 96px;
                font-size: 1.4rem;
            }

            .video-cover {
                background-image: url('https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/80f4e54f26fc4271aa1c45a81808bd15?x-expires=1666296000&x-signature=VkROKHTXPt9aklnn1YfMxeBO0sw%3D');
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                flex: 0 0 42px;
                width: 42px;
                height: 56px;
                border-radius: 2px;
            }
        }
    }
`;
