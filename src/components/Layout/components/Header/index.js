import React from 'react';
import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faPlus,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
    const cx = classnames.bind(styles);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok Logo" />
                </Link>

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
