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
    const currentUserId = 8;

    const [users, setUsers] = useState([]);
    const [followingIDs, setFollowingIDs] = useState([]);
    const [suggestUsers, setSuggestUsers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [thumbHeight, setThumbHeight] = useState(20);

    const contentRef = useRef(null);
    const scrollRef = useRef(null);
    const observer = useRef(null);

    useEffect(() => {
        const getUserAPI = async () => {
            const users = await userService.get();

            setUsers(users);

            const currentUser = users.find((user) => user.id === currentUserId);
            const followingIDs = currentUser.followingIDs.map((id) => id);

            setFollowingIDs(followingIDs);

            const suggestUsers = users.filter(
                (user) =>
                    user.tick &&
                    user.followers_count > 10000 &&
                    !followingIDs.includes(user.id) &&
                    user.id !== currentUserId,
            );

            const followings = users.filter((user) =>
                followingIDs.includes(user.id),
            );

            setSuggestUsers(suggestUsers.slice(0, 2));
            setFollowings(followings.slice(0, 5));
        };

        getUserAPI();
    }, []);

    const handleMore = async (title) => {
        if (title === 'Suggested accounts') {
            const suggestUsers = users.filter(
                (user) =>
                    user.tick &&
                    user.followers_count > 10000 &&
                    !followingIDs.includes(user.id) &&
                    user.id !== currentUserId,
            );

            setSuggestUsers(suggestUsers);
        } else {
            const followings = users.filter((user) =>
                followingIDs.includes(user.id),
            );
            setFollowings(followings);
        }
    };

    const handleLess = async (title) => {
        if (title === 'Suggested accounts') {
            const suggestUsers = users.filter(
                (user) =>
                    user.tick &&
                    user.followers_count > 10000 &&
                    !followingIDs.includes(user.id) &&
                    user.id !== currentUserId,
            );

            setSuggestUsers(suggestUsers.slice(0, 2));
        } else {
            const followings = users.filter((user) =>
                followingIDs.includes(user.id),
            );
            setFollowings(followings.slice(0, 5));
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
                        onLess={handleLess}
                    />
                </div>

                <div className={cx('following')}>
                    <UserList
                        title="Following accounts"
                        users={followings}
                        text="See more"
                        onMore={handleMore}
                        onLess={handleLess}
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
