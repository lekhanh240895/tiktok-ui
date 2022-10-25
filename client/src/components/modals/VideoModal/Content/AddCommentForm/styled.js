import styled from 'styled-components';

export const Wrapper = styled.form`
    &.add-comment-form {
        height: 82px;
        background-color: #fff;
        padding: 21px 0;
        margin: 0 30px;
        display: flex;

        .form-group {
            flex: 1;
            position: relative;
            background-color: rgba(22, 24, 35, 0.06);
            border: 1px solid transparent;
            padding: 7px 10px;
            border-radius: 8px;

            .form-control {
                background-color: transparent;
                min-height: 17px;
                width: 100%;
                caret-color: var(--primary-color);
            }
        }
        .post-comment-btn {
            min-width: 60px;
            background-color: transparent;
            color: var(--primary-color);
        }
        .post-comment-btn.disabled {
            background-color: transparent;
            pointer-events: none;
            color: rgba(22, 24, 35, 0.34);
        }
    }
`;
