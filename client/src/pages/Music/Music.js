import { useParams } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import {
    CodeIcon,
    CopyIcon,
    DownArrow,
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
import Button from '~/components/Button';
import {
    Container,
    Header,
    HeaderActions,
    ShareTitle,
    SharedInfo,
    ImageWrapper,
    VideoItem,
    VideoList,
    ShareOptionsWrapper,
    ShareOptions,
    MoreOptions,
    ShareMenuItem,
    MoreMenuItem,
    MoreShareItemButton,
} from './styled';
import { useEffect, useRef, useState } from 'react';
import { configNumber } from '~/services';
import { useSelector } from 'react-redux';
import { usersSelector, videosSelector } from '~/redux/selectors';
import ShareVideoItem from '~/components/ShareVideoItem';

const SHARE_MENU = [
    {
        icon: <CodeIcon width="2.6rem" height="2.6rem" />,
        title: 'Embed',
    },
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
    const [isMore, setIsMore] = useState(false);
    const [isPlaying, setIsPLaying] = useState(false);
    const { musicname } = useParams();
    const [progress, setProgress] = useState(0);
    const { users } = useSelector(usersSelector);

    console.log({ musicname });

    const handleTimeUpdate = () => {
        const { currentTime, duration } = videoRef.current;

        const progress = Math.floor((currentTime / duration) * 100);

        setProgress(progress);
    };

    useEffect(() => {
        setIsPLaying(false);
    }, [musicname]);

    const musicVideos = videos?.filter((video) => video.music === musicname);
    console.log({ musicVideos });
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
                <SharedInfo>
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
                </SharedInfo>

                <HeaderActions>
                    <div>
                        <HeadlessTippy
                            placement="bottom-end"
                            offset={[10, 10]}
                            onClickOutside={() => setIsMore(false)}
                            delay={[200, 500]}
                            interactive
                            render={(attrs) => (
                                <ShareOptionsWrapper>
                                    <ShareOptions tabIndex="-1" {...attrs}>
                                        {!isMore ? (
                                            <>
                                                {SHARE_MENU.slice(0, 5).map(
                                                    (item, index) => (
                                                        <ShareMenuItem
                                                            key={index}
                                                        >
                                                            <Button
                                                                secondary
                                                                leftIcon={
                                                                    item.icon
                                                                }
                                                            >
                                                                {item.title}
                                                            </Button>
                                                        </ShareMenuItem>
                                                    ),
                                                )}

                                                <MoreShareItemButton
                                                    onClick={() =>
                                                        setIsMore(true)
                                                    }
                                                >
                                                    <DownArrow
                                                        width="2.4rem"
                                                        height="2.4rem"
                                                    />
                                                </MoreShareItemButton>
                                            </>
                                        ) : (
                                            SHARE_MENU.map((item, index) => (
                                                <ShareMenuItem key={index}>
                                                    <Button
                                                        secondary
                                                        leftIcon={item.icon}
                                                    >
                                                        {item.title}
                                                    </Button>
                                                </ShareMenuItem>
                                            ))
                                        )}
                                    </ShareOptions>
                                </ShareOptionsWrapper>
                            )}
                        >
                            <span className="share-icon">
                                <ShareIcon width="2.4rem" height="2.4rem" />
                            </span>
                        </HeadlessTippy>
                    </div>

                    <HeadlessTippy
                        placement="bottom-end"
                        offset={[10, 10]}
                        delay={[200, 500]}
                        interactive
                        render={(attrs) => (
                            <MoreOptions tabIndex="-1" {...attrs}>
                                {MORE_MENU.map((item, index) => (
                                    <MoreMenuItem key={index}>
                                        <Button secondary leftIcon={item.icon}>
                                            {item.title}
                                        </Button>
                                    </MoreMenuItem>
                                ))}
                            </MoreOptions>
                        )}
                    >
                        <span>
                            <MoreIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </HeadlessTippy>
                </HeaderActions>
            </Header>

            <VideoList>
                {musicVideos.map((video) => {
                    const user = users.find(
                        (user) => user._id === video.user._id,
                    );
                    return (
                        <VideoItem key={video._id}>
                            <ShareVideoItem
                                video={video}
                                username={user.username}
                            />
                        </VideoItem>
                    );
                })}
            </VideoList>
        </Container>
    );
}
