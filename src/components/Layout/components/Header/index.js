import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faPlus,
    faSearch,
    faSpinner,
    faXmarkCircle,
    faLanguage,
    faQuestionCircle,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '../AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classnames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

export default function Header() {
    const [searchResult, setSearchResult] = useState([]);

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

                <Tippy
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
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                </Tippy>

                <div className={cx('actions')}>
                    <Button
                        secondary
                        to="/upload"
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    >
                        Upload
                    </Button>
                    <Button primary style={{ fontWeight: 700 }}>
                        Login
                    </Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
