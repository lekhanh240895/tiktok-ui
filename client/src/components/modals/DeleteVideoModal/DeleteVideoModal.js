import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '~/components/modals/Modal';
import { appSelector, videosSelector } from '~/redux/selectors';
import appSlice from '~/redux/slices/appSlice';
import { deleteVideo } from '~/redux/slices/videosSlice';
import { handleDeleteFilesFirebase } from '~/services/firebaseService';
import { Wrapper } from './styled';

export default function DeleteVideoModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedVideoID } = useSelector(appSelector);
    const { videos } = useSelector(videosSelector);
    const handleDelete = () => {
        const video = videos.find((video) => video._id === selectedVideoID);
        handleDeleteFilesFirebase([video.cover, video.src]);
        dispatch(deleteVideo(selectedVideoID));
        navigate(-1);
        dispatch(appSlice.actions.setIsDeleteModalShow(false));
    };
    const handleCancel = () => {
        dispatch(appSlice.actions.setIsDeleteModalShow(false));
    };
    return (
        <Modal>
            <Wrapper>
                <div className="header">
                    <h2 className="header-title">
                        Are you sure you want to delete this video?
                    </h2>
                </div>
                <div className="delete-btn" onClick={handleDelete}>
                    Delete
                </div>
                <div className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </div>
            </Wrapper>
        </Modal>
    );
}
