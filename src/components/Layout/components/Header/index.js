import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { Link } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '../AccountItem';
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
    SearchIcon,
    SettingIcon,
    UploadIcon,
} from '~/components/Icons';
import Image from '~/components/Image';

const cx = classnames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <LanguageIcon width="20" height="20" />,
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
        icon: <HelpIcon width="20" height="20" />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon width="20" height="20" />,
        title: 'Keyboard shortcuts',
    },
];

const USER_MENU = [
    {
        icon: <ProfileIcon width="20" height="20" />,
        title: 'View Profile',
    },
    {
        icon: <CoinIcon width="20" height="20" />,
        title: 'Get coins',
    },
    {
        icon: <SettingIcon width="20" height="20" />,
        title: 'Settings',
    },
    ...MENU_ITEMS,
    {
        icon: <LogoutIcon width="20" height="20" />,
        title: 'Log out',
        separate: true,
    },
];

export default function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 3000);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok Logo" />
                </Link>

                <HeadlessTippy
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div
                            className={cx('search-result')}
                            tabIndex="-1"
                            {...attrs}
                        >
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>

                                <ul className={cx('account-list')}>
                                    <li>
                                        <AccountItem />
                                    </li>
                                    <li>
                                        <AccountItem />
                                    </li>
                                    <li>
                                        <AccountItem />
                                    </li>
                                    <li>
                                        <AccountItem />
                                    </li>
                                </ul>
                            </PopperWrapper>
                        </div>
                    )}
                    interactive
                >
                    <form className={cx('search')}>
                        <input
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                            type="text"
                        />

                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>

                        <button className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>

                        <button type="submit" className={cx('search-btn')}>
                            <SearchIcon width="24" height="24" />
                        </button>
                    </form>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    <Button
                        secondary
                        to="/upload"
                        leftIcon={<UploadIcon width="20" height="20" />}
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
                                    className={cx('action-btn')}
                                >
                                    <MessageIcon
                                        width="26"
                                        height="26"
                                        style={{ paddingTop: '2px' }}
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
                                alt="Khanh Le"
                                src="hhttps://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/7032952352898285569.jpeg?x-expires=1659002400&x-signature=7Ztzp7ocpjswC%2BQE3V6A4o4bRi0%3D"
                                // fallback="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/3fda2cca3e9257c62e6fb3b8e9710184~c5_100x100.jpeg?x-expires=1659027600&x-signature=UJT%2F4mvNwkrDdfqItWKz%2BoydeVM%3D"
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
