import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { configNumber } from '~/services';
import { CommentIcon, ShareIcon, SolidHeartIcon } from '../../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '~/redux/selectors';
import { likeVideo } from '~/redux/slices/videosSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '../../Popper/Menu';
import {
    CodeIcon,
    CopyIcon,
    FacebookIcon,
    LineIcon,
    LinkedInIcon,
    MailIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';

const cx = classnames.bind(styles);
const SHARE_MENU = [
    {
        icon: <CodeIcon width="2.6rem" height="2.6rem" />,
        title: 'Embed',
    },
    {
        icon: <FacebookIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Facebook',
    },
    {
        icon: <WhatsappIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Whatsapp',
    },
    {
        icon: <TwitterIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Twitter',
    },
    {
        icon: <CopyIcon width="2.6rem" height="2.6rem" />,
        title: 'Copy link',
    },
    {
        icon: <LinkedInIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Reddit',
    },
    {
        icon: <TelegramIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Telegram',
    },
    {
        icon: <MailIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Line',
    },
    {
        icon: <PinterestIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Pinterest',
    },
];

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

                <Menu
                    items={SHARE_MENU}
                    style={{ width: '280px', maxHeight: '448px' }}
                    moreArrow
                    offset={[7, 12]}
                    delay={[200, 500]}
                    placement="top-start"
                >
                    <li className={cx('action-item')}>
                        <span className={cx('action-item-btn')}>
                            <ShareIcon width="2.4rem" height="2.4rem" />
                        </span>
                        <span className={cx('video-stat')}>
                            {configNumber(video.shares.length)}
                        </span>
                    </li>
                </Menu>
            </ul>
        </div>
    );
}
