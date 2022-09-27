import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { videosSelector } from '~/redux/selectors';
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
    const [activeTab, setActiveTab] = useState('videos');
    const lineRef = useRef(null);
    const { videos } = useSelector(videosSelector);

    const handleHoverNavItem = (name) => {
        switch (name) {
            case 'account':
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
                    onMouseEnter={() => handleHoverNavItem('top')}
                    onClick={() => handleClickItem('top')}
                >
                    Top
                </NavItem>

                <NavItem
                    active
                    onMouseEnter={() => handleHoverNavItem('account')}
                    onClick={() => handleClickItem('account')}
                >
                    Account
                </NavItem>

                <NavItem
                    onMouseEnter={() => handleHoverNavItem('videos')}
                    onClick={() => handleClickItem('videos')}
                >
                    Videos
                </NavItem>

                <Line ref={lineRef}></Line>
            </NavList>

            <VideoList>
                {(activeTab === 'videos' ? videos : videos).map((video) => (
                    <VideoItem key={video._id}>
                        <VideoComp video={video} />
                    </VideoItem>
                ))}
            </VideoList>
        </Container>
    );
}
