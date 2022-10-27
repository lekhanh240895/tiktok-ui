import React, { useCallback, useEffect } from 'react';
import { TimesIcon, EditIcon, LeftArrowIcon } from '~/components/Icons';
import { Wrapper } from './styled';
import Button from '~/components/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import editModalSlice from '~/redux/slices/editModalSlice';
import { authSelector } from '~/redux/selectors';
import { useNavigate } from 'react-router-dom';
import Image from '~/components/Image';
import authSlice, { update } from '~/redux/slices/authSlice';
import Spinner from '~/components/Spinner/Spinner';
import Cropper from 'react-easy-crop';
import getCroppedImg from '~/utils/cropImage';
import { uploadFileFirebase } from '~/services/firebaseService';

import { dataUrlToFile } from '~/services/uploadService';

export default function EditProfileModal() {
    const { currentUser, isLoading, error } = useSelector(authSelector);
    const [formData, setFormData] = useState({
        username: currentUser?.username,
        full_name: currentUser?.full_name,
        bio: currentUser?.bio,
    });
    const [image, setImage] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener('load', () => {
                setImage(reader.result);
            });
        }
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const dispatch = useDispatch();

    const escFunction = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                dispatch(editModalSlice.actions.hide());
            }
        },
        [dispatch],
    );

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, [escFunction]);

    useEffect(() => {
        if (
            formData.username !== currentUser?.username ||
            formData.full_name !== currentUser?.full_name ||
            formData.bio !== currentUser?.bio ||
            croppedImage
        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [currentUser, formData, croppedImage]);

    const handleInputChange = (e) => {
        const target = e.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCropAvatar = async () => {
        if (image) {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            setCroppedImage(croppedImage);
            setImage(null);
        }
    };

    const onHide = () => {
        dispatch(editModalSlice.actions.hide());
        dispatch(authSlice.actions.reset());
    };

    useEffect(() => {
        if (isUpdated) {
            navigate(`/@${formData.username}`, {
                replace: true,
            });
            dispatch(editModalSlice.actions.hide());
            window.location.reload();
        }
    }, [isUpdated, dispatch, formData, navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            if (croppedImage) {
                const file = await dataUrlToFile(croppedImage, 'upload.jpeg');
                const url = await uploadFileFirebase('avatars/', file);
                const newFormData = { ...formData, avatar: url };

                await dispatch(
                    update({ _id: currentUser?._id, formData: newFormData }),
                ).unwrap();
            } else {
                await dispatch(
                    update({ _id: currentUser?._id, formData }),
                ).unwrap();
            }

            setIsUpdated(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Wrapper>
            <div className="modal">
                <div className="modal_inner">
                    {error && <div className="error error--edit">{error}</div>}
                    {isLoading ? (
                        <Spinner />
                    ) : image ? (
                        <>
                            <div className="modal_header">
                                <h1>
                                    <span
                                        className="back-icon icon-wrapper"
                                        onClick={() => setImage(null)}
                                    >
                                        <LeftArrowIcon
                                            width="2.4rem"
                                            height="2.4rem"
                                        />
                                    </span>
                                    Edit Photo
                                </h1>
                            </div>

                            <div className="modal_body--crop">
                                <div className="crop-wrapper">
                                    <Cropper
                                        image={image}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                    <div className="avatar-view" />
                                </div>
                                <div className="slider-container">
                                    <span>Zoom</span>
                                    <input
                                        className="zoom"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        type="range"
                                        onChange={(e) =>
                                            setZoom(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal_footer">
                                <div className="button_group">
                                    <Button
                                        secondary
                                        onClick={() => setImage(null)}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>

                                    <Button primary onClick={handleCropAvatar}>
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modal_header">
                                <h1>Edit profile</h1>

                                <span onClick={onHide}>
                                    <TimesIcon width="2.4rem" height="2.4rem" />
                                </span>
                            </div>

                            <form
                                onSubmit={handleUpdateProfile}
                                className="form"
                            >
                                <div className="modal_body">
                                    <div className="photo">
                                        <h2>Profile photo</h2>

                                        <div className="img">
                                            <Image
                                                src={
                                                    croppedImage ||
                                                    currentUser?.avatar
                                                }
                                                alt="Avatar"
                                            />
                                            <label htmlFor="avatar-change">
                                                <span className="edit-icon icon-wrapper">
                                                    <EditIcon
                                                        width="1.6rem"
                                                        height="1.6rem"
                                                    />
                                                </span>
                                            </label>
                                            <input
                                                id="avatar-change"
                                                type="file"
                                                accept="image/*"
                                                name="avatar"
                                                hidden
                                                onChange={onSelectFile}
                                            />
                                        </div>
                                    </div>

                                    <div className="username">
                                        <h2>Username</h2>
                                        <div>
                                            <input
                                                type="text"
                                                onChange={handleInputChange}
                                                name="username"
                                                value={formData.username}
                                            />
                                            <p>{`www.tiktok.com/@${formData.username}`}</p>
                                            <p>
                                                Usernames can only contain
                                                letters, numbers, underscores,
                                                and periods. Changing your
                                                username will also change your
                                                profile link.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="name">
                                        <h2>Name</h2>
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="full_name"
                                            value={formData.full_name}
                                        />
                                    </div>

                                    <div className="bio">
                                        <h2>Bio</h2>
                                        <div>
                                            <textarea
                                                placeholder="Bio"
                                                name="bio"
                                                onChange={handleInputChange}
                                                maxLength="80"
                                                value={formData.bio}
                                            />
                                            <span>
                                                {formData.bio.length}/80
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal_footer">
                                    <div className="button_group">
                                        <Button
                                            secondary
                                            onClick={onHide}
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
                        </>
                    )}
                </div>
            </div>
        </Wrapper>
    );
}
