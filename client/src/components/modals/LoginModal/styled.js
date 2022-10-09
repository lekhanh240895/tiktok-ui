import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0 0 0 / 40%);
    z-index: 99;
    display: flex;

    .modal {
        margin: auto;
        height: 100vh;
        max-width: calc(100vw - 32px);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: show 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

        @keyframes show {
            from {
                opacity: 0;
                transform: scale(0);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .modal_inner {
            background-color: #fff;
            height: 620px;
            width: 480px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            position: relative;

            .close-icon {
                color: rgba(22, 24, 35, 0.85);
                cursor: pointer;
                border-radius: 50%;
                background-color: rgba(22, 24, 35, 0.03);
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                width: 24px;
                height: 24px;
                top: 24px;
                right: 24px;
                transform: scale(1.7);
                z-index: 1;
                padding: 4px;
            }

            .modal_body {
                padding-top: 58px;
                flex: 1 1 0%;
                overflow: auto;

                &::-webkit-scrollbar {
                    border-radius: 0;
                    width: 8px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background-color: rgb(22 24 35 / 6%);
                }
                &::-webkit-scrollbar-track {
                    border-radius: 0;
                    background-color: rgba(0, 0, 0, 0);
                }
            }

            .modal_footer {
                text-align: center;
                border-top: 1px solid rgba(22, 24, 35, 0.2);
                padding: 20px 0;

                .footer-link {
                    color: var(--primary-color);
                    font-weight: 600;
                    margin-left: 5px;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
`;
