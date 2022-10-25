import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 544px;
    flex: 0 0 544px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .comments-container {
        flex: 1;
        width: 100%;
        padding: 24px 32px 0;
        background-color: #f8f8f8;
        overflow: auto;
        border-top: 1px solid rgb(22 24 35 / 20%);
        border-bottom: 1px solid rgb(22 24 35 / 20%);

        .comment-list {
            .comment-item {
                display: flex;
                position: relative;
                margin-bottom: 16px;

                &:hover .option-icon {
                    opacity: 1;
                }

                .comment-wrapper {
                    flex: 1;
                    margin-left: 12px;
                    .comment-username {
                        font-size: 1.8rem;
                        font-weight: 700;
                        line-height: 25px;
                    }
                    .check {
                        margin-left: 5px;
                    }
                    .comment-text {
                        line-height: 22px;
                        white-space: pre-line;
                        word-break: break-word;
                        margin-bottom: 6px;
                    }
                    .comment-info {
                        color: rgba(22, 24, 35, 0.5);
                        font-size: 14px;
                        line-height: 20px;
                        .reply-button {
                            margin-left: 24px;
                        }
                    }
                    .reply-action-text {
                        margin-top: 16px;
                        font-size: 1.4rem;
                        font-weight: 600;
                        line-height: 20px;
                        color: rgba(22, 24, 35, 0.5);
                    }
                }
                .like-wrapper {
                    display: flex;
                    flex-direction: column;
                    padding-top: 24px;
                    padding-right: 2px;
                    align-items: center;
                    width: 24px;
                    flex: 0 0 24px;
                    color: rgb(22 24 35 / 50%);
                    .like-icon {
                        line-height: 0;
                        cursor: pointer;
                        margin-bottom: 4px;
                    }
                    .like-count {
                        font-size: 1.2rem;
                        line-height: 17px;
                    }
                }

                .option-icon {
                    position: absolute;
                    right: 5px;
                    top: -5px;
                    transform: rotate(90deg);
                    opacity: 0;
                    transition: opacity 0.3s ease-out;
                    cursor: pointer;
                }
            }
        }
    }
`;
