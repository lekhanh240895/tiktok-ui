import React, { useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';
import {
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';

import * as userService from '~/services/userService';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import UserList from './UserList';
import Discover from './Discover';
import Footer from './Footer';

const cx = classnames.bind(styles);

export default function Sidebar() {
    const [suggestUsers, setSuggestUsers] = useState([]);
    const [followUsers, setFollowUsers] = useState([]);
    const [thumbHeight, setThumbHeight] = useState(20);

    const contentRef = useRef(null);
    const scrollRef = useRef(null);
    const observer = useRef(null);

    useEffect(() => {
        const getUserAPI = async () => {
            const suggestUsers = await userService.search('', {
                tick: true,
                followers_count_gte: 100000,
                _page: 1,
                _limit: 5,
            });

            const followUsers = await userService.search('', {
                _page: 1,
                _limit: 5,
            });

            setSuggestUsers(suggestUsers);
            setFollowUsers(followUsers);
        };

        getUserAPI();
    }, []);

    const handleMore = async (title) => {
        if (title === 'Suggested accounts') {
            const suggestUsers = await userService.search('', {
                tick: true,
                followers_count_gte: 100000,
            });

            setSuggestUsers(suggestUsers);
        } else {
            const followUsers = await userService.search('', {});
            setFollowUsers(followUsers);
        }
    };

    const handleResize = (ref) => {
        const { scrollHeight, clientHeight } = ref;

        setThumbHeight(
            Math.max((clientHeight / scrollHeight) * clientHeight, 20),
        );
    };

    const handleThumbPosition = () => {
        if (!contentRef.current || !scrollRef.current) {
            return;
        }
        const {
            scrollTop: contentTop,
            scrollHeight: contentHeight,
            clientHeight: trackHeight,
        } = contentRef.current;

        let newTop = Math.floor(+(contentTop / contentHeight) * trackHeight);

        newTop = Math.min(newTop, trackHeight - thumbHeight);

        scrollRef.current.style.top = newTop + 'px';
    };

    useEffect(() => {
        if (contentRef.current) {
            const ref = contentRef.current;

            observer.current = new ResizeObserver(() => {
                handleResize(ref);
            });

            observer.current.observe(ref);

            ref.addEventListener('scroll', handleThumbPosition);

            return () => {
                ref.removeEventListener('scroll', handleThumbPosition);
            };
        }
    });

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('content')} ref={contentRef}>
                <Menu>
                    <MenuItem
                        title="For You"
                        icon={<HomeIcon />}
                        activeIcon={<HomeIcon />}
                        to={config.routes.home}
                    />
                    <MenuItem
                        title="Following"
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                        to={config.routes.following}
                    />
                    <MenuItem
                        title="LIVE"
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                        to={config.routes.live}
                    />
                </Menu>

                <div className={cx('suggest')}>
                    <UserList
                        title="Suggested accounts"
                        users={suggestUsers}
                        text="See all"
                        onMore={handleMore}
                    />
                </div>

                <div className={cx('following')}>
                    <UserList
                        title="Following accounts"
                        users={followUsers}
                        text="See more"
                        onMore={handleMore}
                    />
                </div>

                <Discover />

                <Footer />
            </div>

            <div
                className={cx('scrollbar')}
                ref={scrollRef}
                style={{ height: thumbHeight }}
            >
                <div className={cx('scrollbar-thumb')}></div>
            </div>
        </aside>
    );
}
