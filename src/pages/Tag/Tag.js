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
    PinterestIcon,
    RedditIcon,
    ShareIcon,
    TagIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useAppContext } from '~/store/AppContext';
import {
    Container,
    Header,
    Bio,
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
    TagnameWrapper,
} from './styled';
import { useEffect, useState } from 'react';
import VideoComp from './VideoComp';
import { configNumber } from '~/services';

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

export default function Tag() {
    const [{ videos }] = useAppContext();
    const [isMore, setIsMore] = useState(false);
    const { tagname } = useParams();
    const [tagWidth, setTagWidth] = useState();

    const tagVideos = videos?.filter((video) => video.tags.includes(tagname));

    const totalViews = tagVideos?.reduce((total, video) => {
        return total + video.views;
    }, 0);

    useEffect(() => {
        const inputText = tagname;
        const font = '25px sans-serif';
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const width = context.measureText(inputText).width;
        const formattedWidth = Math.ceil(width);

        setTagWidth(formattedWidth);
    }, [tagname]);

    if (!tagname) return;

    return (
        <Container>
            <Header>
                <SharedInfo>
                    <ImageWrapper>
                        {Number(tagWidth) < 110 ? (
                            <>
                                <Image
                                    src="https://picsum.photos/500/500"
                                    alt={'Tag Image'}
                                />

                                <h4>{`#${tagname.replace(' ', '')}`}</h4>
                            </>
                        ) : (
                            <TagnameWrapper>
                                <TagIcon width="8rem" height="8rem" />
                            </TagnameWrapper>
                        )}
                    </ImageWrapper>
                    <ShareTitle>
                        <h2>{tagname}</h2>
                        <p>{configNumber(totalViews)}</p>
                    </ShareTitle>
                </SharedInfo>

                <Bio>
                    Nếu cuộc sống luôn đơn giản như cách mọi người nghĩ thì chắc
                    chắn sẽ không có gì thú vị rồi🤣 Sự thật là luôn có nhiều
                    điều bất ngờ đằng sau, chia sẻ câu chuyện của bạn cùng đoạn
                    âm thanh siêu hài hước nhé~😝
                </Bio>

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
                {tagVideos.map((video) => (
                    <VideoItem key={video.id}>
                        <VideoComp src={video.src} title={video.title} />
                    </VideoItem>
                ))}
            </VideoList>
        </Container>
    );
}
