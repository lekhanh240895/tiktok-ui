import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-top: 40px;
    padding-left: 40px;
    width: 100%;
    footer.content-wrapper {
        display: grid;
        grid-template-columns: repeat(5, minmax(150px, 1fr));
        column-gap: 8px;

        .footer-content-column {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .footer-content-column__title {
            font-weight: 700;
            font-size: 1.4rem;
            line-height: 28px;
            padding: 0 16px;
        }
        .footer-content-column__list {
            display: flex;
            flex-direction: column;
            color: var(--white-color);
        }
        .footer-content-column__item {
            color: #ccc;
            justify-content: flex-start;
            margin-left: 0;
            font-size: 1.4rem;
            font-weight: 500;
            font-family: 'SofiraPro';
            padding: 4px 16px;
        }
    }
    .footer-bottom {
        width: 100%;
        padding-right: 150px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 16px;

        .select-container {
            position: relative;
            cursor: pointer;
            font-size: 1.4rem;
            width: 170px;

            .select-label {
                color: #fff;
                width: 100%;
                border: 1px solid #8a8b91;
                border-radius: 2px;
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
                color: #000;
                animation: show 0.3s ease forwards;

                .select-option {
                    padding: 0 12px;
                    line-height: 34px;
                    cursor: pointer;

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
        .copy-right {
            font-size: 1.4rem;
            color: #8a8b91;
            font-weight: 500;
            line-height: 24px;
        }
    }
`;
