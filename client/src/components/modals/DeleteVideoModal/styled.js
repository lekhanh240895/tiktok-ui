import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: #fff;
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;

    .header {
        padding: 32px 32px 24px;
        text-align: center;

        .header-title {
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
            font-family: var(--font-family);
        }
        .header-desc {
            font-size: 1.5rem;
            color: rgb(22 24 35 / 50%);
            margin-top: 8px;
            line-height: 18px;
        }
    }

    .delete-btn,
    .cancel-btn {
        padding: 16px;
        width: 100%;
        text-align: center;
        border-top: 1px solid rgb(22 24 35 / 12%);
        font-size: 1.5rem;
        cursor: pointer;
    }
    .delete-btn {
        font-weight: 600;
    }
`;
