import Modal from '~/components/modals/Modal';
import { Wrapper } from './styled';

export default function DiscardModal({ onDiscard, onCancel }) {
    return (
        <Modal>
            <Wrapper>
                <div className="header">
                    <h2 className="header-title">Discard this post?</h2>
                    <p className="header-desc">
                        The video and all edits will be discarded.
                    </p>
                </div>
                <div
                    className="discard-btn"
                    onClick={() => {
                        onDiscard();
                        onCancel();
                    }}
                >
                    Discard
                </div>
                <div className="cancel-btn" onClick={onCancel}>
                    Continue editing
                </div>
            </Wrapper>
        </Modal>
    );
}
