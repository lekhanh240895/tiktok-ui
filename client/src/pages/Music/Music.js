import { Link, useParams } from 'react-router-dom';

import {
    CheckedIcon,
    CopyIcon,
    FacebookIcon,
    FlagIcon,
    LineIcon,
    LinkedInIcon,
    MailIcon,
    MoreIcon,
    PauseIcon,
    PinterestIcon,
    PlayIcon,
    RedditIcon,
    ShareIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';
import {
    Container,
    Header,
    HeaderActions,
    ShareTitle,
    ShareInfo,
    ImageWrapper,
    VideoItem,
    VideoList,
    Bio,
} from './styled';
import { useEffect, useRef, useState } from 'react';
import { configNumber } from '~/services';
import { useSelector } from 'react-redux';
import { videosSelector } from '~/redux/selectors';
import ShareVideoItem from '~/components/ShareVideoItem';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';

const SHARE_MENU = [
    {
        icon: <FacebookIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Facebook',
        to: '/feedback',
    },
    {
        icon: <WhatsappIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Whatsapp',
    },
    {
        icon: <TwitterIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Twitter',
    },
    {
        icon: <CopyIcon width="2.6rem" height="2.6rem" />,
        title: 'Copy link',
    },
    {
        icon: <LinkedInIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Reddit',
    },
    {
        icon: <TelegramIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Telegram',
    },
    {
        icon: <MailIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Line',
    },
    {
        icon: <PinterestIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Pinterest',
    },
];

const MORE_MENU = [
    {
        icon: <FlagIcon width="1.6rem" height="1.6rem" />,
        title: 'Report',
    },
];

export default function Music() {
    const { videos } = useSelector(videosSelector);
    const [isPlaying, setIsPLaying] = useState(false);
    const { musicname } = useParams();
    const [progress, setProgress] = useState(0);

    const handleTimeUpdate = () => {
        const { currentTime, duration } = videoRef.current;

        const progress = Math.floor((currentTime / duration) * 100);

        setProgress(progress);
    };

    useEffect(() => {
        setIsPLaying(false);
    }, [musicname]);

    const musicVideos = videos?.filter((video) => video.music === musicname);
    const videoRef = useRef();
    const circleRef = useRef();

    const handlePlay = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            setIsPLaying(false);
        } else {
            videoRef.current.play();
            setIsPLaying(true);
        }
    };

    useEffect(() => {
        if (circleRef.current && videoRef.current) {
            const ref = circleRef.current;
            const strokeLength = ref.getTotalLength();
            ref.style.setProperty('--strokeLength', strokeLength);

            const strokeIncrement = (strokeLength * progress) / 100;

            ref.style.setProperty('--strokeIncrement', strokeIncrement);
            if (progress < 100) {
                ref.style.setProperty(
                    '--strokeCalc',
                    strokeLength - strokeIncrement,
                );
            } else {
                ref.style.setProperty('--strokeCalc', 0);
            }
        }
    }, [progress]);

    const handleEnded = () => {
        setIsPLaying(false);
        setProgress(0);
    };

    if (musicVideos.length <= 0) return;

    return (
        <Container>
            <Header>
                <ShareInfo>
                    <ImageWrapper>
                        <video
                            src={musicVideos[0].src}
                            ref={videoRef}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEnded}
                        />

                        {progress > 0 && (
                            <span className="circle">
                                <svg height="7.8rem" width="7.8rem">
                                    <circle
                                        className="circle1"
                                        strokeWidth="3"
                                        stroke="rgba(22, 24, 35, 0.12)"
                                        r="36"
                                        cx="39"
                                        cy="39"
                                        fill="transparent"
                                    ></circle>

                                    <circle
                                        className="circle2"
                                        cx="39"
                                        cy="39"
                                        r="36"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="transparent"
                                        ref={circleRef}
                                    />
                                </svg>
                            </span>
                        )}

                        <span onClick={handlePlay} className="play-btn">
                            {isPlaying ? (
                                <PauseIcon width="3.2rem" height="3.2rem" />
                            ) : (
                                <PlayIcon width="3.2rem" height="3.2rem" />
                            )}
                        </span>
                    </ImageWrapper>

                    <ShareTitle>
                        <h2>{musicname}</h2>
                        <p>{configNumber(musicVideos.length)} videos</p>
                    </ShareTitle>
                </ShareInfo>

                <Bio>
                    Đã trôi qua nửa năm 2022, bạn đã thay đổi như thế nào? Tham
                    gia ngay hot trend để mọi người cùng ngắm nhìn hành trình
                    “lột xác” của bạn nhé~ 🥰
                </Bio>

                <HeaderActions>
                    <Menu
                        items={SHARE_MENU}
                        style={{ width: '280px', maxHeight: '448px' }}
                        moreArrow
                        delay={[200, 500]}
                    >
                        <span className="share-icon">
                            <ShareIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </Menu>

                    <Menu
                        items={MORE_MENU}
                        placement="bottom-end"
                        style={{ width: '180px' }}
                    >
                        <span>
                            <MoreIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </Menu>
                </HeaderActions>
            </Header>

            <VideoList>
                {musicVideos.map((video) => {
                    return (
                        <VideoItem key={video._id}>
                            <ShareVideoItem video={video}>
                                <div className="sub-content">
                                    <Link
                                        to={`/@${video.user.username}`}
                                        className="user-info"
                                    >
                                        <span className="avatar-wrapper">
                                            <Image
                                                src={video.user.avatar}
                                                className="avatar"
                                            />
                                        </span>
                                        <span className="video-info">
                                            {video.user.username}
                                            {video.user.tick && (
                                                <CheckedIcon
                                                    className="check"
                                                    width="1.4rem"
                                                    height="1.4rem"
                                                />
                                            )}
                                        </span>
                                    </Link>
                                </div>
                            </ShareVideoItem>
                        </VideoItem>
                    );
                })}
            </VideoList>
        </Container>
    );
}
