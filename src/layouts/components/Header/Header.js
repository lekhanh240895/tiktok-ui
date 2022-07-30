import React from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css'; // optional
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
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
    ProfileIcon,
    SettingIcon,
    UploadIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import { useAppContext } from '~/contexts/AppContext';

const cx = classnames.bind(styles);

export default function Header() {
    const { currentUser } = useAppContext();

    if (!currentUser) return;

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
            to: `/@${currentUser.nickname}`,
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
                        to="/upload"
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
                                <button
                                    to="/messages"
                                    className={cx('action-btn', 'icon-wrapper')}
                                >
                                    <MessageIcon
                                        width="2.6rem"
                                        height="2.6rem"
                                    />
                                </button>
                            </Tippy>
                            <Tippy
                                content={<span>Inbox</span>}
                                placement="bottom"
                                delay={[0, 200]}
                            >
                                <button
                                    to="/inbox"
                                    className={cx('action-btn')}
                                >
                                    <InboxIcon />
                                    <span className={cx('badge')}>20</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary style={{ fontWeight: 700 }}>
                                Login
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
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
