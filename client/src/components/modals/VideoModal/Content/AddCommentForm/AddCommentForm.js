import React, { useState } from 'react';
import Button from '~/components/Button';
import * as notificationService from '~/services/notificationService';
import * as commentService from '~/services/commentService';
import { useSelector } from 'react-redux';
import { usersSelector } from '~/redux/selectors';
import { Wrapper } from './styled';

export default function AddCommentForm({
    video,
    currentUser,
    setIsAddComment,
    comments,
    setComments,
    socket,
}) {
    const [commentInput, setCommentInput] = useState('');
    const { users } = useSelector(usersSelector);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await commentService.create({
            videoID: video._id,
            text: commentInput,
        });
        setCommentInput('');
        setIsAddComment(true);
        const newComment = { ...response, video, user: currentUser };
        setComments(comments.concat(newComment));

        const tagUsernames = newComment.text.match(/[@]\w*\b/g) || [];
        if (tagUsernames.length > 0) {
            const tagUsers = users.filter((user) =>
                tagUsernames.some(
                    (username) => username.replace('@', '') === user.username,
                ),
            );
            tagUsers.forEach(async (user) => {
                const tagData = {
                    receiver: user._id,
                    type: 'mention',
                    subType: 'mention-comment',
                    video,
                    sender: currentUser,
                    comment: newComment,
                };
                socket.emit('sendNotification', tagData);

                if (tagData.receiver !== tagData.sender._id) {
                    await notificationService.create({
                        ...tagData,
                        createdAt: new Date(),
                    });
                }
            });
        } else {
            const data = {
                receiver: video.user._id,
                type: 'comment',
                video,
                sender: currentUser,
                comment: newComment,
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
        <Wrapper className="add-comment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    id="add-comment"
                    type="text"
                    placeholder="Add comment..."
                    className="form-control"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
            </div>
            <Button
                type="submit"
                className={
                    commentInput
                        ? 'post-comment-btn'
                        : 'post-comment-btn disabled'
                }
            >
                Post
            </Button>
        </Wrapper>
    );
}
