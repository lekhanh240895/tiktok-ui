import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faPlus,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '../AccountItem';

export default function Header() {
    const cx = classnames.bind(styles);

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
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
                    <button>
                        <FontAwesomeIcon icon={faPlus} />
                        Upload
                    </button>

                    <button>Login</button>
                </div>
            </div>
        </header>
    );
}
