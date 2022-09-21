import React, { useEffect } from 'react';
import { DeleteIcon, EditIcon2 } from '~/components/Icons';
import { Wrapper } from './styled';
import Button from '~/components/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import editModalSlice from '~/redux/slices/editModalSlice';
import { appSelector } from '~/redux/selectors';
import { updateUser } from '~/redux/slices/usersSlice';
import appSlice from '~/redux/slices/appSlice';
import { useNavigate } from 'react-router-dom';

export default function EditProfileModal() {
    const { currentUser } = useSelector(appSelector);
    const [nickname, setNickname] = useState(currentUser.nickname);
    const [name, setName] = useState(currentUser.full_name);
    const [bio, setBio] = useState(currentUser.bio);
    const [isChanged, setIsChanged] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (
            nickname !== currentUser.nickname ||
            name !== currentUser.full_name ||
            bio !== currentUser.bio
        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [currentUser, nickname, name, bio]);

    const handleUsernameChange = (e) => {
        setNickname(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        const updatedUserProfile = {
            ...currentUser,
            nickname: nickname,
            full_name: name,
            bio: bio,
        };

        // Update currentUser + users
        dispatch(updateUser(updatedUserProfile));
        dispatch(appSlice.actions.setCurrentUser(updatedUserProfile));

        dispatch(editModalSlice.actions.hideEditModal());

        navigate(`/@${nickname}`, {
            replace: true,
        });
    };

    return (
        <Wrapper>
            <div className="modal">
                <div className="modal_inner">
                    <div className="modal_header">
                        <h1>Edit profile</h1>

                        <span
                            onClick={() =>
                                dispatch(editModalSlice.actions.hideEditModal())
                            }
                        >
                            <DeleteIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </div>

                    <form onSubmit={handleUpdateProfile}>
                        <div className="modal_body">
                            <div className="photo">
                                <h2>Profile photo</h2>

                                <div className="img">
                                    <img
                                        src={currentUser.avatar}
                                        alt="Avatar"
                                    />
                                    <label htmlFor="avatar-change">
                                        <span className="edit-icon icon-wrapper">
                                            <EditIcon2
                                                width="1.6rem"
                                                height="1.6rem"
                                            />
                                        </span>
                                    </label>
                                    <input
                                        id="avatar-change"
                                        type="file"
                                        name="avatar"
                                        hidden
                                    />
                                </div>
                            </div>

                            <div className="nickname">
                                <h2>Username</h2>
                                <div>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={handleUsernameChange}
                                        name="nickname"
                                    />
                                    <p>{`www.tiktok.com/@${nickname}`}</p>
                                    <p>
                                        Usernames can only contain letters,
                                        numbers, underscores, and periods.
                                        Changing your username will also change
                                        your profile link.
                                    </p>
                                </div>
                            </div>

                            <div className="name">
                                <h2>Name</h2>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    name="name"
                                />
                            </div>

                            <div className="bio">
                                <h2>Bio</h2>
                                <div>
                                    <textarea
                                        placeholder="Bio"
                                        name="bio"
                                        value={bio}
                                        onChange={handleBioChange}
                                        maxLength="80"
                                    />
                                    <span>{bio.length}/80</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal_footer">
                            <div className="button_group">
                                <Button
                                    secondary
                                    onClick={() =>
                                        dispatch(
                                            editModalSlice.actions.hideEditModal(),
                                        )
                                    }
                                    type="button"
                                >
                                    Cancel
                                </Button>

                                {isChanged ? (
                                    <Button primary type="submit">
                                        Save
                                    </Button>
                                ) : (
                                    <Button disabled>Save</Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}
