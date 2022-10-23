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
    }
`;
