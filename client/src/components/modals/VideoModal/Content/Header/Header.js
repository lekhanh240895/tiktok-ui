import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authSlice from '~/redux/slices/authSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { followUser, unfollowUser } from '~/redux/slices/usersSlice';
import { likeVideo } from '~/redux/slices/videosSlice';
import {
    CheckedIcon,
    CommentIcon,
    CodeIcon,
    FacebookIcon,
    LineIcon,
    LinkedInIcon,
    MailIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
    FriendsShareIcon,
    ShareIcon,
    SolidHeartIcon,
    MusicIcon,
    OptionIcon,
} from '~/components/Icons';
import * as notificationService from '~/services/notificationService';
import Avatar from '~/components/Avatar';
import { Link } from 'react-router-dom';
import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';
import VideoTitle from '~/components/VideoTitle';
import { configNumber } from '~/services';
import Tippy from '@tippyjs/react';
import { Wrapper } from './styled';

const SHARE_MENU = [
    {
        icon: <CodeIcon width="2.4rem" height="2.4rem" />,
        title: 'Embed',
    },
    {
        icon: <FriendsShareIcon width="2.4rem" height="2.4rem" />,
        title: 'Send to friends',
    },
    {
        icon: <FacebookIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Facebook',
        to: '/feedback',
    },
    {
        icon: <WhatsappIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Whatsapp',
    },
    {
        icon: <TwitterIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Twitter',
    },
    {
        icon: <LinkedInIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Reddit',
    },
    {
        icon: <TelegramIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Telegram',
    },
    {
        icon: <MailIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Line',
    },
    {
        icon: <PinterestIcon width="2.4rem" height="2.4rem" />,
        title: 'Share to Pinterest',
    },
];

export default function Header({ video, currentUser, socket, comments }) {
    const [likes, setLikes] = useState(video.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const isUser = video.user._id === currentUser?._id;

    const OPTION_MENU = [
        {
            title: 'Privacy settings',
            hoverColor: true,
        },
        {
            title: 'Delete',
            separate: true,
            videoID: video._id,
            hoverColor: true,
        },
    ];

    useEffect(() => {
        setIsFollow(currentUser?.followingIDs.includes(video.user._id));
    }, [currentUser, video]);

    useEffect(() => {
        if (video) setIsLiked(video.likes.includes(currentUser?._id));
    }, [currentUser, video]);

    const dispatch = useDispatch();
    const formatTime = formatDistanceToNow(new Date(video.createdAt));

    const handleLike = async (e) => {
        if (!currentUser) {
            return dispatch(loginModalSlice.actions.show());
        }

        dispatch(likeVideo(video._id));
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);

        if (!isLiked) {
            const data = {
                receiver: video.user._id,
                type: 'like',
                video: video,
                sender: currentUser,
            };

            socket.emit('sendNotification', data);

            await notificationService.create({
                ...data,
                createdAt: new Date(),
            });
        }
    };
    const handleFollow = async () => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show());
        const updatedUser = {
            ...currentUser,
            followingIDs: currentUser.followingIDs.concat(video.user._id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(followUser(video.user._id));

        const data = {
            receiver: video.user._id,
            type: 'follow',
            sender: currentUser,
        };

        socket.emit('sendNotification', data);

        await notificationService.create({
            ...data,
            createdAt: new Date(),
        });
    };

    const handleUnFollow = () => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show());

        const updatedUser = {
            ...currentUser,
            followingIDs: currentUser.followingIDs.filter(
                (id) => id !== video.user._id,
            ),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(unfollowUser(video.user._id));
    };
    const handleClickCommentIcon = () => {
        const addCommentInput = document.querySelector('input#add-comment');
        addCommentInput.focus();
    };
    return (
        <Wrapper className="header">
            <div className="user-info">
                <Avatar
                    width="4rem"
                    height="4rem"
                    src={video.user.avatar}
                    to={`/@${video.user.username}`}
                />
                <Link to={`/@${video.user.username}`} className="info">
                    <h4>
                        {video.user.username}
                        {video.user.tick && (
                            <CheckedIcon
                                className="check"
                                width="1.4rem"
                                height="1.4rem"
                            />
                        )}
                    </h4>
                    <p>
                        {video.user.full_name} - {formatTime}
                    </p>
                </Link>
                {isUser ? (
                    <Menu
                        items={OPTION_MENU}
                        placement="bottom-end"
                        paddingMenu
                    >
                        <span className="option-icon-wrapper icon-wrapper">
                            <OptionIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </Menu>
                ) : !isFollow ? (
                    <Button
                        primary
                        className="follow-btn"
                        onClick={handleFollow}
                    >
                        Follow
                    </Button>
                ) : (
                    <Button
                        secondary
                        className="follow-btn"
                        onClick={handleUnFollow}
                    >
                        Following
                    </Button>
                )}
            </div>

            <div className="video-title">
                <VideoTitle title={video.title} />
            </div>
            <Button
                text
                to={`/music/${video.music}`}
                className="music"
                leftIcon={<MusicIcon width="1.6rem" height="1.6rem" />}
            >
                {video.music}
            </Button>

            <div className="video-info">
                <div className="like-comment">
                    <span className="likes" onClick={handleLike}>
                        <span
                            className={
                                isLiked
                                    ? 'icon-wrapper-circle liked'
                                    : 'icon-wrapper-circle'
                            }
                        >
                            <SolidHeartIcon width="2rem" height="2rem" />
                        </span>
                        <span className="likes-number">
                            {configNumber(likes)}
                        </span>
                    </span>

                    <span className="comments" onClick={handleClickCommentIcon}>
                        <span className="icon-wrapper-circle">
                            <CommentIcon width="2rem" height="2rem" />
                        </span>
                        <span className="comments-number">
                            {configNumber(comments.length)}
                        </span>
                    </span>
                </div>
                <ul className="share-group">
                    {SHARE_MENU.slice(0, 5).map((item, index) => (
                        <Tippy placement="top" content={item.title} key={index}>
                            <li className="share-item">{item.icon}</li>
                        </Tippy>
                    ))}

                    <Menu items={SHARE_MENU.slice(5)} delay={[200, 500]}>
                        <li className="share-item share-icon">
                            <ShareIcon width="1.6rem" height="1.6rem" />
                        </li>
                    </Menu>
                </ul>
            </div>

            <div className="copylink-container">
                <p className="copylink-text">{window.location.href}</p>
                <button className="copy-btn">Copy link</button>
            </div>
        </Wrapper>
    );
}
