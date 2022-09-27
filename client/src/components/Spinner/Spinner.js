import styled from 'styled-components';

export default function Spinner() {
    return (
        <Wrapper>
            <div className="ring-container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    .ring-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .ring {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 4px solid transparent;
            border-top: 4px solid #24ecff;
            position: relative;
            margin: -30px;
            animation: animate 4s linear infinite;

            &::after {
                content: '';
                position: absolute;
                top: 6px;
                right: 6px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #24ecff;
                box-shadow: 0 0 0 5px #24ecff33, 0 0 0 10px #24ecff22,
                    0 0 0 20px #24ecff11, 0 0 20px #24ecff, 0 0 50px #24ecff;
            }

            @keyframes animate {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            &:nth-child(2) {
                animation: animate2 4s linear infinite;
                animation-delay: -1s;
                border-left: 4px solid #93ff2d;
                border-top: 4px solid transparent;
            }

            @keyframes animate2 {
                from {
                    transform: rotate(360deg);
                }
                to {
                    transform: rotate(0);
                }
            }

            &:nth-child(2)::after {
                content: '';
                position: absolute;
                top: initial;
                bottom: 6px;
                left: 6px;
                background-color: #93ff2d;
                box-shadow: 0 0 0 5px #93ff2d33, 0 0 0 10px #93ff2d22,
                    0 0 0 20px #93ff2d11, 0 0 20px #93ff2d, 0 0 50px #93ff2d;
            }

            &:nth-child(3) {
                position: absolute;
                top: -44.44px;
                border-left: 4px solid #e41cf8;
                border-top: 4px solid transparent;
                animation: animate2 4s linear infinite;
                animation-delay: -3s;
            }

            &:nth-child(3)::after {
                content: '';
                position: absolute;
                top: initial;
                bottom: 6px;
                left: 6px;
                background-color: #e41cf8;
                box-shadow: 0 0 0 5px #e41cf833, 0 0 0 10px #e41cf822,
                    0 0 0 20px #e41cf811, 0 0 20px #e41cf8, 0 0 50px #e41cf8;
            }
        }
    }
`;
