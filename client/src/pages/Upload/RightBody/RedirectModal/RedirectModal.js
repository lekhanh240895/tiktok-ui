import Modal from '~/components/modals/Modal';
import { Wrapper } from './styled';

export default function RedirectModal({ onRedirect, onCancel }) {
    return (
        <Modal>
            <Wrapper>
                <div className="header">
                    <h2 className="header-title">
                        Your video is being uploaded to TikTok!
                    </h2>
                </div>
                <div className="main-btn" onClick={onCancel}>
                    Upload another video
                </div>
                <div
                    className="sub-btn"
                    onClick={() => {
                        onCancel();
                        onRedirect();
                    }}
                >
                    View Profile
                </div>
            </Wrapper>
        </Modal>
    );
}
