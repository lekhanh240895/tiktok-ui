import React, { useEffect } from 'react';
import { useAppContext } from '~/store/AppContext';
import * as actions from '~/store/actions';
import { DeleteIcon, EditIcon2 } from '~/components/Icons';
import { Wrapper } from './styled';
import Button from '~/components/Button';
import { useState } from 'react';

export default function EditProfileModal() {
    const [{ currentUser }, dispatch] = useAppContext();
    const [username, setUsername] = useState(currentUser.nickname);
    const [name, setName] = useState(currentUser.full_name);
    const [bio, setBio] = useState(currentUser.bio);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (
            username !== currentUser.nickname ||
            name !== currentUser.full_name ||
            bio !== currentUser.bio
        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [currentUser, username, name, bio]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleUpdateProfile = () => {
        const updatedUserProfile = {
            ...currentUser,
            nickname: username,
            full_name: name,
            bio: bio,
        };
        dispatch(actions.updateProfile(updatedUserProfile));
        dispatch(actions.openEditModal(false));
    };

    return (
        <Wrapper>
            <div className="modal">
                <div className="modal_inner">
                    <div className="modal_header">
                        <h1>Edit profile</h1>

                        <span
                            onClick={() =>
                                dispatch(actions.openEditModal(false))
                            }
                        >
                            <DeleteIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </div>

                    <div className="modal_body">
                        <div className="photo">
                            <h2>Profile photo</h2>

                            <div className="img">
                                <img src={currentUser.avatar} alt="Avatar" />
                                <span className="edit-icon icon-wrapper">
                                    <EditIcon2 width="1.6rem" height="1.6rem" />
                                </span>
                            </div>
                        </div>

                        <div className="username">
                            <h2>Username</h2>
                            <div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                                <p>{`www.tiktok.com/@${username}`}</p>
                                <p>
                                    Usernames can only contain letters, numbers,
                                    underscores, and periods. Changing your
                                    username will also change your profile link.
                                </p>
                            </div>
                        </div>

                        <div className="name">
                            <h2>Name</h2>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
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
                                    dispatch(actions.openEditModal(false))
                                }
                            >
                                Cancel
                            </Button>

                            {isChanged ? (
                                <Button primary onClick={handleUpdateProfile}>
                                    Save
                                </Button>
                            ) : (
                                <Button disabled>Save</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
