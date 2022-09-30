import React from 'react';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { Link, useLocation } from 'react-router-dom';

import styles from './Header2.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
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
import { authSelector } from '~/redux/selectors';
import loginModalSlice from '~/redux/slices/loginModalSlice';

const cx = classnames.bind(styles);

export default function Header2() {
    const { currentUser } = useSelector(authSelector);
    const dispatch = useDispatch();
    const location = useLocation();

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

    const handleclick = (e) => {
        if (!currentUser) {
            e.preventDefault();
            dispatch(loginModalSlice.actions.show());
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <Image src={images.logo} alt="Tiktok Logo" />
                </Link>

                {/* Search */}
                <Search />

                <div className={cx('actions')}>
                    <Button
                        secondary
                        className={cx('upload-btn')}
                        to="/upload"
                        onClick={handleclick}
                        leftIcon={<UploadIcon width="2rem" height="2rem" />}
                        style={({ isActive }) =>
                            isActive
                                ? {
                                      backgroundColor: '#f1f1f2',
                                  }
                                : undefined
                        }
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
                                <Button
                                    text
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
                                </Button>
                            </Tippy>
                            <Tippy
                                content={<span>Inbox</span>}
                                placement="bottom"
                                delay={[0, 200]}
                            >
                                <Button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>20</span>
                                </Button>
                            </Tippy>
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

                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                alt={currentUser.full_name}
                                src={currentUser.avatar || ''}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <OptionIcon width="2rem" height="2rem" />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
