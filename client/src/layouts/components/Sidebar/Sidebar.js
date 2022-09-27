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
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, usersSelector } from '~/redux/selectors';
import Button from '~/components/Button';
import loginModalSlice from '~/redux/slices/loginModalSlice';

const cx = classnames.bind(styles);

export default function Sidebar({ width }) {
    const [thumbHeight, setThumbHeight] = useState(20);
    const { users } = useSelector(usersSelector);
    const { currentUser } = useSelector(authSelector);
    const dispatch = useDispatch();

    const contentRef = useRef(null);
    const scrollRef = useRef(null);
    const observer = useRef(null);

    const suggestUsers = users.filter(
        (user) =>
            user.tick &&
            user.followers_count > 100000 &&
            !currentUser?.followingIDs.includes(user._id) &&
            user._id !== currentUser?._id,
    );

    const followingUsers = users.filter((user) =>
        currentUser?.followingIDs.includes(user._id),
    );

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

                {!currentUser && (
                    <div className={cx('login')}>
                        <p>
                            Log in to follow creators, like videos, and view
                            comments.
                        </p>

                        <Button
                            outline
                            className={cx('login-btn')}
                            onClick={() =>
                                dispatch(loginModalSlice.actions.show())
                            }
                        >
                            Log in
                        </Button>
                    </div>
                )}

                <div className={cx('suggest')}>
                    <UserList
                        title="Suggested accounts"
                        users={suggestUsers}
                        text="See all"
                        showUser={true}
                    />
                </div>

                {currentUser && (
                    <div className={cx('following')}>
                        <UserList
                            title="Following accounts"
                            users={followingUsers}
                            text="See more"
                            showUser={false}
                        />
                    </div>
                )}

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
