import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 1100px;
    margin: 16px auto;
    background-color: var(--white-color);
    padding: 24px 56px;
    border-radius: 8px;

    .header {
        .heading {
            font-family: var(--font-family);
            font-weight: 700;
        }
        .desc {
            font-size: 1.8rem;
            color: rgb(22 24 35 / 50%);
        }
    }

    .body {
        display: flex;
        margin: 24px 0 130px;

        .change-video {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 18px;
            padding: 13px;
            border: 1px solid rgba(22 24 35 / 12%);
            border-radius: 8px;

            .video-name {
                font-size: 1.2rem;
                line-height: 1.7rem;
                svg {
                    margin-right: 4px;
                }
            }
            .change-btn {
                font-size: 1.2rem;
                padding: 0;
            }
        }

        .left-body {
            margin-top: 24px;
            border: 2px dashed rgb(22 24 35 / 20%);
            width: 260px;
            height: 460px;
            border-radius: 8px;
            position: relative;
            cursor: pointer;

            .upload-body {
                width: 100%;
                height: 100%;
                padding: 0 35px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .title {
                font-size: 1.8rem;
                font-weight: 600;
                margin-top: 16px;
            }

            .sub-title {
                font-size: 1.4rem;
                color: rgba(22 24 35 / 75%);
                margin: 4px 0 24px;
            }

            .video-info {
                text-align: center;
                font-size: 1.4rem;
                color: rgb(22 24 35 / 50%);
                margin-bottom: 32px;

                div {
                    margin-bottom: 6px;
                }
            }
            .select-btn {
                min-width: 186px;
                border-radius: 2px;
            }

            &:hover {
                border-color: var(--primary-color);
                background-color: var(--main-background-color);
            }

            .drag-file-element {
                position: absolute;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
            }
        }
    }
`;
