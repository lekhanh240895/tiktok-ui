import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { Link, useLocation } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
    ArrowIcon,
    CoinIcon,
    HelpIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MessageIcon,
    OptionIcon,
    ProfileIcon,
    SettingIcon,
    SolidMessageIcon,
    UploadIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { authSelector } from '~/redux/selectors';
import Avatar from '~/components/Avatar';
import Notifications from '~/components/Notifications';
import { appSelector } from '~/redux/selectors';
import * as notificationService from '~/services/notificationService';
import { isEqual } from 'lodash';

const cx = classnames.bind(styles);

export default function Header({ innerWidth }) {
    const { currentUser } = useSelector(authSelector);
    const MENU_ITEMS = [
        {
            icon: <LanguageIcon width="2rem" height="2rem" />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <HelpIcon width="2rem" height="2rem" />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <KeyboardIcon width="2rem" height="2rem" />,
            title: 'Keyboard shortcuts',
        },
    ];
    const USER_MENU = [
        {
            icon: <ProfileIcon width="2rem" height="2rem" />,
            title: 'View Profile',
            to: `/@${currentUser?.username}`,
        },
        {
            icon: <CoinIcon width="2rem" height="2rem" />,
            title: 'Get coins',
        },
        {
            icon: <SettingIcon width="2rem" height="2rem" />,
            title: 'Settings',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon width="2rem" height="2rem" />,
            title: 'Log out',
            separate: true,
        },
    ];

    const dispatch = useDispatch();
    const location = useLocation();
    const [notifications, setNotifications] = useState(
        JSON.parse(localStorage.getItem('notifications')) || [],
    );
    const [unreadMessages, setUnreadMessages] = useState(
        JSON.parse(localStorage.getItem('unreadMessages')) || [],
    );
    const { socket, selectedConversationID } = useSelector(appSelector);

    const setLocalData = (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    };

    useEffect(() => {
        socket?.on('getMessage', (data) => {
            if (selectedConversationID === data.conversation) {
                setUnreadMessages([]);
                setLocalData('unreadMessages', []);
            } else {
                const newMessages = unreadMessages.concat(data);
                setUnreadMessages(newMessages);
                setLocalData('unreadMessages', newMessages);
            }
        });
    }, [socket, unreadMessages, selectedConversationID]);

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const notifs = await notificationService.get(currentUser._id);
                setNotifications(notifs);
                setLocalData('notifications', notifs);
            }
        })();
    }, [currentUser]);

    useEffect(() => {
        socket?.on('getNotification', async (data) => {
            const newNotif = {
                ...data,
                createdAt: new Date(),
            };

            const notifsData = notifications.map((n) => {
                const { createdAt, updatedAt, _id, __v, ...other } = n;
                return other;
            });

            const isExists = notifsData.some((notif) => isEqual(notif, data));

            if (!isExists) {
                const newNotifs = notifications.concat(newNotif);
                setNotifications(newNotifs);
                setLocalData('notifications', newNotifs);
            }
        });
    }, [socket, notifications]);

    const handleClickUpload = (e) => {
        if (!currentUser) {
            e.preventDefault();
            dispatch(loginModalSlice.actions.show());
        }
    };

    const orderedNotifications = notifications.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')} style={{ width: innerWidth }}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <Image src={images.logo} alt="Tiktok Logo" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    <Button
                        secondary
                        className={cx('upload-btn')}
                        to="/upload"
                        onClick={handleClickUpload}
                        leftIcon={<UploadIcon width="2rem" height="2rem" />}
                    >
                        Upload
                    </Button>

                    {currentUser ? (
                        <>
                            <Tippy
                                content={<span>Messages</span>}
                                placement="bottom"
                                delay={[0, 200]}
                            >
                                <Link
                                    to="/messages"
                                    className={cx('action-btn', 'icon-wrapper')}
                                >
                                    {location.pathname === '/messages' ? (
                                        <SolidMessageIcon
                                            width="2.6rem"
                                            height="2.6rem"
                                        />
                                    ) : (
                                        <MessageIcon
                                            width="2.6rem"
                                            height="2.6rem"
                                        />
                                    )}
                                    <span
                                        className={cx('badge', 'icon-wrapper')}
                                    >
                                        {unreadMessages.length}
                                    </span>
                                </Link>
                            </Tippy>

                            <div className="icon-wrapper">
                                <HeadlessTippy
                                    trigger="click"
                                    interactive
                                    offset={[-100, 13]}
                                    render={(attrs) => (
                                        <div
                                            className={cx(
                                                'notifications-wrapper',
                                            )}
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <PopperWrapper
                                                style={{ overflow: 'unset' }}
                                            >
                                                <Notifications
                                                    notifications={
                                                        orderedNotifications
                                                    }
                                                />
                                            </PopperWrapper>

                                            <div
                                                data-popper-arrow=""
                                                className={cx('arrow')}
                                            >
                                                <ArrowIcon />
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Tippy
                                        content={<span>Inbox</span>}
                                        placement="bottom"
                                        delay={[0, 200]}
                                    >
                                        <span className={cx('action-btn')}>
                                            <InboxIcon
                                                width="3.2rem"
                                                height="3.2rem"
                                            />

                                            <span
                                                className={cx(
                                                    'badge',
                                                    'icon-wrapper',
                                                )}
                                            >
                                                {notifications.length}
                                            </span>
                                        </span>
                                    </Tippy>
                                </HeadlessTippy>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                primary
                                style={{ fontWeight: 700 }}
                                onClick={() =>
                                    dispatch(loginModalSlice.actions.show())
                                }
                            >
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu
                        items={currentUser ? USER_MENU : MENU_ITEMS}
                        placement="bottom-end"
                        style={{ overflow: 'unset' }}
                    >
                        {currentUser ? (
                            <Avatar
                                src={currentUser.avatar}
                                alt="Avatar"
                                className={cx('user-avatar')}
                            />
                        ) : (
                            <span className={cx('more-btn', 'icon-wrapper')}>
                                <OptionIcon width="2rem" height="2rem" />
                            </span>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
