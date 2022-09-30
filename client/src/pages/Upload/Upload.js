import Button from '~/components/Button';
import { CloudUploadIcon } from '~/components/Icons';
import { Wrapper } from './styled';

export default function Upload() {
    return (
        <Wrapper>
            <div className="header">
                <h2 className="heading">Upload video</h2>
                <p className="desc">Post a videoto your account</p>
            </div>

            <div className="body">
                <label className="left-body" htmlFor="upload-file">
                    <span className="upload-icon">
                        <CloudUploadIcon width="4rem" height="2.9rem" />
                    </span>
                    <span className="title">Select video to upload</span>
                    <p className="sub-title">Or drag and drop a file</p>

                    <div className="video-info">
                        <div>MP4 or WebM</div>
                        <div>720x1280 resolution or higher</div>
                        <div>Up to 10 minutes</div>
                        <div>Less than 2 GB</div>
                    </div>
                    <Button primary className="select-btn">
                        Select file
                    </Button>
                </label>

                <input type="file" hidden id="upload-file" />

                <div className="right-body">
                    <form>
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
                                <div className="bg-empty"></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="title">
                                <label htmlFor="privacy">
                                    Who can view this video?
                                </label>
                            </div>
                            <select
                                defaultValue="Public"
                                id="privacy"
                                className="privacy-select"
                            >
                                <option value="public">Public</option>
                                <option value="friends">Friends</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="title">Allow users to</div>
                            <div className="checkbox-container">
                                <label className="checkbox checkbox-label">
                                    Comment
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox checkbox-label">
                                    Duet
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="checkbox checkbox-label">
                                    Stitch
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="title title-copyright">
                                <span className="copyright">
                                    Run a copyright check
                                </span>
                                <div className="switch">
                                    <div className="switch-wrapper">
                                        <span className="switch-inner"></span>
                                    </div>
                                </div>
                            </div>

                            <p className="copyright-desc">
                                We'll check your video for potential copyright
                                infringements on used sounds. If infringements
                                are found, you can edit the video before
                                posting. <b>Learn more</b>
                            </p>
                        </div>

                        <div className="button-group">
                            <Button
                                secondary
                                type="button"
                                className="action-btn"
                            >
                                Discard
                            </Button>
                            <Button
                                disabled
                                type="submit"
                                className="action-btn"
                            >
                                Post
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}
