import Button from '~/components/Button';
import {
    HeartIcon,
    DownArrow,
    OptionIcon,
    SolidHeartIcon,
    FlagIcon,
    DeleteIcon,
} from '~/components/Icons';
import Avatar from '~/components/Avatar';
import formatDateAgo from '~/services/formatDateAgo';
import * as commentService from '~/services/commentService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '~/redux/selectors';
import Menu from '../Popper/Menu';

export default function Comment({ comment, onDeleteComment }) {
    const MENU = [
        {
            icon: <FlagIcon width="2.4rem" height="2.4rem" />,
            title: 'Report',
            hoverColor: true,
        },
    ];
    const USER_MENU = [
        {
            icon: <DeleteIcon width="2.4rem" height="2.4rem" />,
            title: 'Delete',
            hoverColor: true,
            commentID: comment._id,
        },
    ];

    const { currentUser } = useSelector(authSelector);
    const [likes, setLikes] = useState(comment.likes.length);
    const [isLiked, setIsLiked] = useState(
        comment.likes.includes(currentUser?._id),
    );

    const isUserComment = comment.user._id === currentUser._id;

    const handleLike = async () => {
        await commentService.like(comment._id);
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
        <>
            <Avatar
                width="4rem"
                height="4rem"
                src={comment.user.avatar}
                username={comment.user.username}
            />
            <div className="comment-wrapper">
                <h4 className="comment-username">{comment.user.username}</h4>
                <p className="comment-text">{comment.text}</p>
                <div className="comment-info">
                    <span className="comment-time">
                        {formatDateAgo(comment.createdAt)}
                    </span>
                    <span className="reply-button">Reply</span>
                </div>
                {comment.comments.length > 0 && (
                    <Button
                        text
                        className="reply-action-text"
                        rightIcon={<DownArrow width="1.4rem" height="1.4rem" />}
                    >
                        View more replies (1)
                    </Button>
                )}
            </div>

            <Menu
                items={isUserComment ? USER_MENU : MENU}
                style={{
                    width: '200px',
                }}
                onDeleteComment={onDeleteComment}
            >
                <span className="option-icon">
                    <OptionIcon width="2.4rem" height="2.4rem" />
                </span>
            </Menu>

            <div className="like-wrapper">
                <span
                    className="like-icon"
                    onClick={handleLike}
                    style={{ color: isLiked ? 'red' : 'initial' }}
                >
                    {isLiked ? (
                        <SolidHeartIcon width="2rem" height="2rem" />
                    ) : (
                        <HeartIcon width="2rem" height="2rem" />
                    )}
                </span>
                <span className="like-count">{likes}</span>
            </div>
        </>
    );
}
