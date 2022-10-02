import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '~/components/Button';
import * as videoService from '~/services/videoService';

export default function RightBody({
    thumbnails,
    caption,
    setCaption,
    videoThumb,
    setVideoThumb,
    duration,
    onDiscard,
    video,
}) {
    const [offset, setOffset] = useState(4);
    const [scroll, setScroll] = useState(0);
    const [formData, setFormData] = useState({
        title: caption,
        cover: videoThumb,
        privacy: 'public',
        allowance: {
            comment: false,
            duet: false,
            stitch: false,
        },
    });

    useEffect(() => {
        setOffset(0);
        setScroll(0);
    }, [thumbnails]);

    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (video) {
            const data = new FormData();
            const fileName = video.name;
            data.append('video', video);
            data.append('name', fileName);
            await videoService.upload(data);
        }

        // await videoService.create(formData);
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormData({
            ...formData,
            allowance: {
                ...formData.allowance,
                [name]: value,
            },
        });
    };

    return (
        <div className="right-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="title">
                        <label htmlFor="caption">Caption</label>
                        <div className="limited">0 / 150</div>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            maxLength={150}
                            className="caption-input"
                            id="caption"
                            value={caption}
                            onChange={(e) => {
                                setCaption(e.target.value);
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                });
                            }}
                        />

                        <span className="hashtag">
                            <span className="hash">@</span>
                            <span className="tag">#</span>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="title">
                        <span>Cover</span>
                    </div>
                    <div className="bg-container">
                        {thumbnails.length > 0 ? (
                            <>
                                <div
                                    className="thumbnails"
                                    style={{
                                        maxWidth: '680px',
                                        overflow: 'auto',
                                    }}
                                    onScroll={(e) =>
                                        setScroll(e.target.scrollLeft)
                                    }
                                >
                                    {thumbnails.map((item, index) => (
                                        <img
                                            onClick={(e) => {
                                                setVideoThumb(item);
                                                setOffset(e.target.offsetLeft);
                                            }}
                                            src={item}
                                            alt="cover"
                                            key={index}
                                            className="thumbnail"
                                            style={{
                                                width: `calc(680px / ${duration}`,
                                            }}
                                        />
                                    ))}
                                </div>

                                {videoThumb && (
                                    <div
                                        className="choosen"
                                        style={{
                                            transform: `translate3d( ${
                                                offset - scroll
                                            }px ,1px, 0px) scaleX(1.1)    scaleY(1.1)`,
                                        }}
                                    >
                                        <img
                                            src={videoThumb}
                                            alt="thumbnail"
                                            className="choosen-thumbnail"
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-empty"></div>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <div className="title">
                        <label htmlFor="privacy">
                            Who can view this video?
                        </label>
                    </div>
                    <select
                        id="privacy"
                        className="privacy-select"
                        defaultValue={formData.privacy}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                privacy: e.target.value,
                            })
                        }
                    >
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <div className="form-group">
                    <div className="title">Allow users to</div>
                    <div className="checkbox-container">
                        <label className="checkbox">
                            Comment
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                name="comment"
                                onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="checkbox">
                            Duet
                            <input
                                name="duet"
                                type="checkbox"
                                className="checkbox-input"
                                onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="checkbox">
                            Stitch
                            <input
                                name="stitch"
                                type="checkbox"
                                className="checkbox-input"
                                onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="title title-copyright">
                        <span className="copyright">Run a copyright check</span>
                        <div className="switch">
                            <div className="switch-wrapper">
                                <span className="switch-inner"></span>
                            </div>
                        </div>
                    </div>

                    <p className="copyright-desc">
                        We'll check your video for potential copyright
                        infringements on used sounds. If infringements are
                        found, you can edit the video before posting.{' '}
                        <b>Learn more</b>
                    </p>
                </div>

                <div className="button-group">
                    <Button
                        secondary
                        type="button"
                        className="action-btn"
                        onClick={onDiscard}
                    >
                        Discard
                    </Button>
                    <Button
                        disabled={video === null}
                        type="submit"
                        className="action-btn"
                        primary
                    >
                        Post
                    </Button>
                </div>
            </form>
        </div>
    );
}
