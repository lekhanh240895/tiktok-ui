import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { configNumber } from '~/services';
import { CommentIcon, ShareIcon, SolidHeartIcon } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '~/redux/selectors';
import { likeVideo } from '~/redux/slices/videosSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShareOptionsMenu from '../ShareOptionsMenu';

const cx = classnames.bind(styles);

export default function ActionList({ video }) {
    const { currentUser } = useSelector(authSelector);
    const [likes, setLikes] = useState(video.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(video.likes.includes(currentUser?._id));
    }, [currentUser, video]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLike = (e) => {
        if (!currentUser) {
            return dispatch(loginModalSlice.actions.show());
        }

        dispatch(likeVideo(video._id));
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleComment = () => {
        if (!currentUser) {
            return dispatch(loginModalSlice.actions.show());
        }
        navigate(`/@${video.user.username}/video/${video._id}`, {
            state: {
                background: location,
            },
        });
    };

    return (
        <div className={cx('actions')}>
            <ul className={cx('actions-list')}>
                <li className={cx('action-item')} onClick={handleLike}>
                    <span
                        className={cx('action-item-btn')}
                        style={{ color: isLiked ? 'red' : 'initial' }}
                    >
                        <SolidHeartIcon width="2.4rem" height="2.4rem" />
                    </span>
                    <span className={cx('video-stat')}>
                        {configNumber(likes)}
                    </span>
                </li>
                <li className={cx('action-item')} onClick={handleComment}>
                    <span className={cx('action-item-btn')}>
                        <CommentIcon width="2.4rem" height="2.4rem" />
                    </span>
                    <span className={cx('video-stat')}>
                        {configNumber(video.comments.length)}
                    </span>
                </li>

                <ShareOptionsMenu offset={[7, 12]}>
                    <li className={cx('action-item')}>
                        <span className={cx('action-item-btn')}>
                            <ShareIcon width="2.4rem" height="2.4rem" />
                        </span>
                        <span className={cx('video-stat')}>
                            {configNumber(video.shares.length)}
                        </span>
                    </li>
                </ShareOptionsMenu>
            </ul>
        </div>
    );
}
