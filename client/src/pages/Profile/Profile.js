import { useParams } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import {
    BlockIcon,
    CheckedIcon,
    CodeIcon,
    CopyIcon,
    DownArrow,
    EditIcon,
    FacebookIcon,
    FlagIcon,
    IsFriendIcon,
    LineIcon,
    LinkedInIcon,
    LockIcon,
    MailIcon,
    MoreIcon,
    PinterestIcon,
    RedditIcon,
    ShareIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { configNumber } from '~/services';
import {
    Container,
    Header,
    Bio,
    HeaderActions,
    ShareTitle,
    SharedInfo,
    UserStats,
    VideoItem,
    VideoList,
    NavList,
    NavItem,
    Line,
    StyledButton,
    FriendIconWrapper,
    ButtonGroup,
    ShareOptionsWrapper,
    ShareOptions,
    MoreOptions,
    ShareMenuItem,
    MoreMenuItem,
    MoreShareItemButton,
} from './styled';
import { useEffect, useRef, useState } from 'react';
import VideoComp from './VideoComp';
import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, usersSelector, videosSelector } from '~/redux/selectors';
import editModalSlice from '~/redux/slices/editModalSlice';
import { followUser, unfollowUser } from '~/redux/slices/usersSlice';
import authSlice from '~/redux/slices/authSlice';

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
    {
        icon: <BlockIcon width="1.6rem" height="1.6rem" />,
        title: 'Block',
    },
];

export default function Profile() {
    const { users } = useSelector(usersSelector);
    const { currentUser } = useSelector(authSelector);
    const { videos } = useSelector(videosSelector);
    const [activeTab, setActiveTab] = useState('videos');
    const [isUser, setIsUser] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();
    const lineRef = useRef(null);
    const { username } = useParams();
    const user = users?.find((user) => user.username === username);

    useEffect(() => {
        if (user?._id === currentUser?._id) {
            setIsUser(true);
        } else {
            setIsUser(false);

            if (currentUser?.followingIDs?.includes(user?._id)) {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
        }
    }, [users, user, currentUser]);

    useEffect(() => {
        if (lineRef.current) {
            handleHoverNavItem('videos');
            setActiveTab('videos');
        }
    }, [user]);

    const handleHoverNavItem = (name) => {
        if (name === 'liked') {
            lineRef.current.style.transform = 'translateX(230px)';
        } else if (name === 'videos') {
            lineRef.current.style.transform = 'translateX(0)';
        }
    };

    const userVideos = videos.filter((video) => video.userID === user?._id);
    const likeCount = userVideos.reduce((total, cur) => {
        return (total += cur.likes.length);
    }, 0);

    const likedVideos = videos.filter((video) =>
        video.likes.includes(user._id),
    );

    const handleClickItem = (tab) => {
        setActiveTab(tab);
    };

    const handleFollow = () => {
        const updatedUser = {
            ...currentUser,
            followingIDs: currentUser.followingIDs.concat(user._id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(followUser(user._id));
    };

    const handleUnFollow = () => {
        const updatedUser = {
            ...currentUser,
            followingIDs: currentUser.followingIDs.filter(
                (id) => id !== user._id,
            ),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(unfollowUser(user._id));
    };

    if (!user) return;
    return (
        <Container>
            <Header>
                <SharedInfo>
                    <Image src={user.avatar} alt={user.full_name} />
                    <ShareTitle>
                        <h2>
                            {user.username}
                            {user.tick && (
                                <CheckedIcon width="2rem" height="2rem" />
                            )}
                        </h2>
                        <h4>{user.full_name}</h4>

                        {isUser && (
                            <Button
                                secondary
                                leftIcon={
                                    <EditIcon width="2rem" height="2rem" />
                                }
                                onClick={() =>
                                    dispatch(editModalSlice.actions.show())
                                }
                            >
                                Edit profile
                            </Button>
                        )}

                        {!isUser &&
                            (!isFollowing ? (
                                <StyledButton primary onClick={handleFollow}>
                                    Follow
                                </StyledButton>
                            ) : (
                                <ButtonGroup>
                                    <StyledButton outline>
                                        Messages
                                    </StyledButton>

                                    <Tippy
                                        placement="bottom"
                                        content="Unfollow"
                                    >
                                        <FriendIconWrapper
                                            onClick={handleUnFollow}
                                        >
                                            <IsFriendIcon
                                                width="2rem"
                                                height="2rem"
                                            />
                                        </FriendIconWrapper>
                                    </Tippy>
                                </ButtonGroup>
                            ))}
                    </ShareTitle>
                </SharedInfo>

                <div>
                    <UserStats>
                        <span>{configNumber(user.followingIDs?.length)}</span>
                        Following
                    </UserStats>
                    <UserStats>
                        <span>{configNumber(user.followerIDs?.length)}</span>
                        Followers
                    </UserStats>
                    <UserStats>
                        <span>{configNumber(likeCount)}</span>Likes
                    </UserStats>
                </div>

                <Bio>{user.bio}</Bio>

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

                    {!isUser && (
                        <HeadlessTippy
                            placement="bottom-end"
                            offset={[10, 10]}
                            delay={[200, 500]}
                            interactive
                            render={(attrs) => (
                                <MoreOptions tabIndex="-1" {...attrs}>
                                    {MORE_MENU.map((item, index) => (
                                        <MoreMenuItem key={index}>
                                            <Button
                                                secondary
                                                leftIcon={item.icon}
                                            >
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
                    )}
                </HeaderActions>
            </Header>

            <NavList>
                <NavItem
                    active
                    onMouseEnter={() => handleHoverNavItem('videos')}
                    onClick={() => handleClickItem('videos')}
                >
                    Videos
                </NavItem>

                <NavItem
                    onMouseEnter={() => handleHoverNavItem('liked')}
                    onClick={() => handleClickItem('liked')}
                >
                    <span>
                        <LockIcon width="1.8rem" height="1.8rem" />
                    </span>
                    Liked
                </NavItem>

                <Line ref={lineRef}></Line>
            </NavList>

            <VideoList>
                {(activeTab === 'videos' ? userVideos : likedVideos).map(
                    (video) => (
                        <VideoItem key={video._id}>
                            <VideoComp src={video.src} title={video.title} />
                        </VideoItem>
                    ),
                )}
            </VideoList>
        </Container>
    );
}
