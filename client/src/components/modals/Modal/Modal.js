import { Wrapper } from './styled';

export default function Modal({ children }) {
    return (
        <Wrapper>
            <div className="modal">{children}</div>
        </Wrapper>
    );
}
