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
    PinterestIcon,
    RedditIcon,
    ShareIcon,
    TagIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
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
    TagnameWrapper,
} from './styled';
import { useEffect, useState } from 'react';
import { configNumber } from '~/services';
import { useSelector } from 'react-redux';
import { videosSelector } from '~/redux/selectors';
import ShareVideoItem from '~/components/ShareVideoItem';
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

export default function Tag() {
    const { videos } = useSelector(videosSelector);
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
                {tagVideos.map((video) => {
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
