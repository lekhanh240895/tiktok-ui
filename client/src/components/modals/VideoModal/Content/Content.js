import { Wrapper } from './styled';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
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
} from '~/components/Icons';
import { configNumber } from '~/services';
import Tippy from '@tippyjs/react';
import { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '~/components/Avatar';
import Comment from '~/components/Comment';
import * as commentService from '~/services/commentService';
import { useDispatch } from 'react-redux';
import videosSlice from '~/redux/slices/videosSlice';
import Menu from '~/components/Popper/Menu';

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

export default function Content({ user, video }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const commentRef = useRef(null);

    useEffect(() => {
        const fetchComments = async () => {
            const comments = await commentService.get(video._id);
            setComments(comments);
        };
        fetchComments();
    }, [video]);

    const dispatch = useDispatch();
    const formatTime = formatDistanceToNow(new Date(video.createdAt));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = await commentService.create({
            videoID: video._id,
            text: comment,
        });
        setComment('');
        dispatch(
            videosSlice.actions.addComment({
                videoID: video._id,
                newComment,
            }),
        );
        commentRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    };
    return (
        <Wrapper>
            <div className="header">
                <div className="user-info">
                    <Avatar src={user.avatar} username={user.username} />
                    <Link to={`/@${user.username}`} className="info">
                        <h4>
                            {user.username}
                            {user.tick && (
                                <CheckedIcon
                                    className="check"
                                    width="1.4rem"
                                    height="1.4rem"
                                />
                            )}
                        </h4>
                        <p>
                            {user.full_name} - {formatTime}
                        </p>
                    </Link>
                    <Button outline className="follow-btn">
                        Follow
                    </Button>
                </div>

                <div className="video-title">{video.title}</div>
                <Button
                    text
                    className="music"
                    leftIcon={<MusicIcon width="1.6rem" height="1.6rem" />}
                >
                    {video.music}
                </Button>
                <div className="video-info">
                    <div className="like-comment">
                        <span className="likes">
                            <span className="icon-wrapper-circle">
                                <SolidHeartIcon width="2rem" height="2rem" />
                            </span>
                            <span className="likes-number">
                                {configNumber(video.likes.length)}
                            </span>
                        </span>

                        <span className="comments">
                            <span className="icon-wrapper-circle">
                                <CommentIcon width="2rem" height="2rem" />
                            </span>
                            <span className="comments-number">
                                {configNumber(video.comments.length)}
                            </span>
                        </span>
                    </div>
                    <ul className="share-group">
                        {SHARE_MENU.slice(0, 5).map((item, index) => (
                            <Tippy
                                placement="top"
                                content={item.title}
                                key={index}
                            >
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
            </div>

            <div className="comments-container">
                <ul className="comment-list" ref={commentRef}>
                    {comments.map((comment) => (
                        <li className="comment-item" key={comment._id}>
                            <Comment comment={comment} />
                        </li>
                    ))}
                </ul>
            </div>

            <form className="add-comment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Add comment..."
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    className={
                        comment
                            ? 'post-comment-btn'
                            : 'post-comment-btn disabled'
                    }
                >
                    Post
                </Button>
            </form>
        </Wrapper>
    );
}
