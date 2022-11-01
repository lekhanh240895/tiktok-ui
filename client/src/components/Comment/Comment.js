import Button from '~/components/Button';
import {
    HeartIcon,
    DownArrow,
    OptionIcon,
    SolidHeartIcon,
    FlagIcon,
    DeleteIcon,
    CheckedIcon,
} from '~/components/Icons';
import Avatar from '~/components/Avatar';
import formatDateAgo from '~/services/formatDateAgo';
import * as commentService from '~/services/commentService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { appSelector, authSelector } from '~/redux/selectors';
import Menu from '../Popper/Menu';
import { renderText } from '~/services/renderText';
import * as notificationService from '~/services/notificationService';

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
    const { socket } = useSelector(appSelector);
    const [likes, setLikes] = useState(comment.likes.length);
    const [isLiked, setIsLiked] = useState(
        comment.likes.includes(currentUser?._id),
    );

    const isUserComment = comment.user._id === currentUser?._id;

    const handleLike = async () => {
        await commentService.like(comment._id);
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);

        if (!isLiked) {
            const data = {
                receiver: comment.user._id,
                type: 'like',
                video: comment.video,
                sender: currentUser,
                subType: 'like-comment',
                comment,
            };

            socket.emit('sendNotification', data);

            if (data.receiver !== data.sender._id) {
                await notificationService.create({
                    ...data,
                    createdAt: new Date(),
                });
            }
        }
    };

    return (
        <>
            <Avatar
                width="4rem"
                height="4rem"
                src={comment.user.avatar}
                to={`/@${comment.user.username}`}
            />
            <div className="comment-wrapper">
                <h4 className="comment-username">
                    {comment.user.username}
                    {comment.user.tick && (
                        <CheckedIcon
                            className="check"
                            width="1.4rem"
                            height="1.4rem"
                        />
                    )}
                </h4>
                <p className="comment-text">{renderText(comment.text)}</p>
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
                delay={[200, 0]}
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
