import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { usersSelector, videosSelector } from '~/redux/selectors';
import AccountItem from './AccountItem';
import {
    Container,
    VideoItem,
    VideoList,
    NavList,
    NavItem,
    Line,
} from './styled';
import VideoComp from './VideoComp';

export default function Search() {
    const [activeTab, setActiveTab] = useState('topVideos');
    const lineRef = useRef(null);
    const { videos } = useSelector(videosSelector);
    const { users } = useSelector(usersSelector);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const topVideos = videos.filter(
        (video) =>
            video.views >= 1000000 &&
            video.likes.length >= 1 &&
            video.title.toLowerCase().includes(query.toLowerCase()),
    );

    const accounts = users.filter(
        (user) =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.full_name.toLowerCase().includes(query.toLowerCase()),
    );

    const otherVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase()),
    );

    useEffect(() => {
        if (topVideos.length < 1) {
            if (accounts.length > 0) {
                setActiveTab('accounts');
                handleHoverNavItem('accounts');
            } else if (videos.length > 0) {
                setActiveTab('videos');
                handleHoverNavItem('videos');
            }
        } else {
            setActiveTab('topVideos');
            handleHoverNavItem('topVideos');
        }
    }, [accounts.length, topVideos.length, videos.length]);

    const handleHoverNavItem = (name) => {
        switch (name) {
            case 'accounts':
                return (lineRef.current.style.transform = 'translateX(230px)');
            case 'videos':
                return (lineRef.current.style.transform = 'translateX(460px)');
            default:
                return (lineRef.current.style.transform = 'translateX(0)');
        }
    };

    const handleClickItem = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container>
            <NavList>
                <NavItem
                    active
                    onMouseEnter={() => handleHoverNavItem('topVideos')}
                    onClick={() => handleClickItem('topVideos')}
                >
                    Top
                </NavItem>

                <NavItem
                    active
                    onMouseEnter={() => handleHoverNavItem('accounts')}
                    onClick={() => handleClickItem('accounts')}
                >
                    Accounts
                </NavItem>

                <NavItem
                    onMouseEnter={() => handleHoverNavItem('videos')}
                    onClick={() => handleClickItem('videos')}
                >
                    Videos
                </NavItem>

                <Line ref={lineRef}></Line>
            </NavList>

            {activeTab === 'topVideos' ? (
                <VideoList>
                    {topVideos.map((video) => (
                        <VideoItem key={video._id}>
                            <VideoComp video={video} />
                        </VideoItem>
                    ))}
                </VideoList>
            ) : activeTab === 'videos' ? (
                <VideoList>
                    {otherVideos.map((video) => (
                        <VideoItem key={video._id}>
                            <VideoComp video={video} />
                        </VideoItem>
                    ))}
                </VideoList>
            ) : (
                <ul>
                    {accounts.map((account) => (
                        <li key={account._id}>
                            <AccountItem user={account} />
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}
