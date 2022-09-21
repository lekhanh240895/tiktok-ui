import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import UserList from './UserList';
import Discover from './Discover';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { appSelector, usersSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

export default function Sidebar({ width }) {
    const [followingIDs, setFollowingIDs] = useState([]);
    const [suggestUsers, setSuggestUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [thumbHeight, setThumbHeight] = useState(20);

    const { users } = useSelector(usersSelector);
    const { currentUser } = useSelector(appSelector);

    const contentRef = useRef(null);
    const scrollRef = useRef(null);
    const observer = useRef(null);

    useEffect(() => {
        const followingIDs = currentUser?.followingIDs?.map((id) => id);

        if (followingIDs) {
            setFollowingIDs(followingIDs);

            const suggestUsers = users.filter(
                (user) =>
                    user.tick &&
                    user.followers_count > 10000 &&
                    !followingIDs.includes(user.id) &&
                    user.id !== currentUser?.id,
            );

            const followingUsers = users.filter((user) =>
                followingIDs.includes(user.id),
            );

            if (window.innerWidth > 1024) {
                setSuggestUsers(suggestUsers.slice(0, 2));
                setFollowingUsers(followingUsers.slice(0, 5));
            } else {
                setSuggestUsers(suggestUsers);
                setFollowingUsers(followingUsers);
            }
        }
    }, [currentUser, users]);

    useEffect(() => {
        const suggestUsers = users.filter(
            (user) =>
                user.tick &&
                user.followers_count > 10000 &&
                !followingIDs.includes(user.id) &&
                user.id !== currentUser?.id,
        );

        const followingUsers = users.filter((user) =>
            followingIDs.includes(user.id),
        );

        window.onresize = () => {
            if (window.innerWidth > 1024) {
                setSuggestUsers(suggestUsers.slice(0, 2));
                setFollowingUsers(followingUsers.slice(0, 5));
            } else {
                setSuggestUsers(suggestUsers);
                setFollowingUsers(followingUsers);
            }
        };
    });

    const handleMore = async (title) => {
        if (title === 'Suggested accounts') {
            const suggestUsers = users.filter(
                (user) =>
                    user.tick &&
                    user.followers_count > 10000 &&
                    !followingIDs.includes(user.id) &&
                    user.id !== currentUser?.id,
            );

            setSuggestUsers(suggestUsers);
        } else {
            const followingUsers = users.filter((user) =>
                followingIDs.includes(user.id),
            );
            setFollowingUsers(followingUsers);
        }
    };

    const handleLess = async (title) => {
        if (title === 'Suggested accounts') {
            const suggestUsers = users.filter(
                (user) =>
                    user.tick &&
                    user.followers_count > 10000 &&
                    !followingIDs.includes(user.id) &&
                    user.id !== currentUser?.id,
            );

            setSuggestUsers(suggestUsers.slice(0, 2));
        } else {
            const followingUsers = users.filter((user) =>
                followingIDs.includes(user.id),
            );
            setFollowingUsers(followingUsers.slice(0, 5));
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

        let newTop = Math.floor((+contentTop / +contentHeight) * trackHeight);

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
        <div
            className={cx('sidebar-scroll-container')}
            style={{ maxWidth: width }}
        >
            <aside className={cx('wrapper')} ref={contentRef}>
                <Menu>
                    <MenuItem
                        title="For You"
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
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
                        showUser={true}
                    />
                </div>

                <div className={cx('following')}>
                    <UserList
                        title="Following accounts"
                        users={followingUsers}
                        text="See more"
                        onMore={handleMore}
                        onLess={handleLess}
                        showUser={false}
                    />
                </div>

                <Discover />

                <Footer />
            </aside>

            <div
                className={cx('scrollbar')}
                ref={scrollRef}
                style={{ height: thumbHeight }}
            >
                <div className={cx('scrollbar-thumb')}></div>
            </div>
        </div>
    );
}
