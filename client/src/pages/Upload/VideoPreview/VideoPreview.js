import Button from '~/components/Button';
import { CheckedIcon, MusicIcon } from '~/components/Icons';
import Image from '~/components/Image';

export default function VideoPreview({
    videoUrl,
    isMuted,
    videoThumb,
    video,
    currentUser,
    caption,
    videoRef,
    handleTimeUpdate,
    progress,
    handleClickProgress,
    handlePlay,
    isPlaying,
    setIsMuted,
}) {
    const handleFormatTime = (seconds) => {
        let m = Math.floor(seconds / 60);
        let s = Math.floor(seconds % 60);

        if ((m > 0) & (m < 10)) {
            m = '0' + m;
        } else if (m <= 0) {
            m = '0';
        }

        if (s < 10) {
            s = '0' + s;
        }

        const time = m + ':' + s;

        return time;
    };

    return (
        <div>
            <div className="video-preview">
                <video
                    src={videoUrl}
                    className="video"
                    ref={videoRef}
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    loop
                    poster={videoThumb}
                    autoPlay={isPlaying}
                    type={video?.type}
                />
                <div className="title">
                    <span>Following</span>
                    <span>For You</span>
                </div>
                <div className="meta-data">
                    <h5 className="username">{`@${currentUser?.username}`}</h5>
                    <p className="caption">{caption}</p>
                    <div className="sound-container">
                        <span>
                            <MusicIcon width="1.7rem" height="1.7rem" />
                        </span>
                        <div className="sound">
                            Original sound - {`${currentUser?.username}`}
                        </div>
                    </div>
                </div>
                <div className="avatar-container">
                    <Image
                        src={currentUser.avatar}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                <div className="music-bar-icon">
                    <Image
                        src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/iconbar_right.8fa90e26.svg"
                        alt="music-bar-icon"
                    />
                </div>
                <div className="album-container">
                    <div className="album"></div>
                    <Image
                        src={currentUser.avatar}
                        alt="avatar"
                        className="album-img"
                    />
                </div>
                <div className="video-controls">
                    <div className="video-controls-bottom">
                        <div className="detail">
                            <div className="left">
                                <span className="play" onClick={handlePlay}>
                                    <img
                                        src={
                                            isPlaying
                                                ? 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/pause.3f559180.svg'
                                                : 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/play.6cac639f.svg'
                                        }
                                        alt="play-icon"
                                    />
                                </span>

                                <span className="time">
                                    {handleFormatTime(
                                        videoRef.current?.currentTime || 0,
                                    )}{' '}
                                    /{' '}
                                    {handleFormatTime(
                                        videoRef.current?.duration || 0,
                                    )}
                                </span>
                            </div>
                            <div className="right">
                                <span
                                    className="volume"
                                    onClick={() => setIsMuted(!isMuted)}
                                >
                                    <img
                                        src={
                                            isMuted
                                                ? 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/mute.75fcd465.svg'
                                                : 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/volume.507835e8.svg'
                                        }
                                        alt="volume"
                                    />
                                </span>
                                <span className="fullscreen">
                                    <img
                                        src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/fullscreen.399035a9.svg"
                                        alt="fullscreen"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="progress-wrap">
                            <div
                                className="progress"
                                onClick={handleClickProgress}
                            />
                            <div
                                className="circle"
                                style={{ left: `${progress}%` }}
                            />
                            <div
                                className="bar"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
                <div className="tiktok-app-frame"></div>
            </div>
            <div className="change-video">
                <span className="video-name icon-wrapper">
                    <CheckedIcon width="1.6rem" height="1.6rem" />
                    video1.mp4
                </span>
                <Button text className="change-btn">
                    Change video
                </Button>
            </div>
        </div>
    );
}
