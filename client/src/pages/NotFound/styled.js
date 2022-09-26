import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-top: 60px;
    height: 100vh;
    background-image: url(${(props) => props.bgImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;

    .container {
        margin: auto;
        display: flex;
        flex-direction: column;

        .not-found {
            line-height: 150px;
            white-space: nowrap;
            font-size: 300px;

            span {
                font-weight: 500;
                font-family: 'SofiaPro';
            }

            .smile-img {
                width: 244px;
                height: 244px;
                object-fit: contain;
                vertical-align: middle;
            }
        }

        .not-found-desc {
            font-size: 1.8rem;
            color: rgba(22 24 35 / 50%);
            text-align: center;
            margin-top: 24px;
        }

        .recommend-desc {
            text-align: center;
            font-family: 'SofiaPro';
            font-weight: 700;
            font-size: 2.4rem;
            margin-top: 40px;
        }
        .btn-wrapper {
            text-align: center;

            .back-home-btn {
                min-width: 360px;
                padding: 14px 16px;
                margin-top: 24px;
            }
        }
    }
`;
