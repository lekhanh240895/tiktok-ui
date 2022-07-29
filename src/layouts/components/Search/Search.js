import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '../AccountItem';
import { DeleteIcon, SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks/useDebounce';
import * as userService from '~/services/userService';
import * as keywordService from '~/services/keywordService';
import Button from '~/components/Button';

const cx = classnames.bind(styles);

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);

    const renderSearchKeywords = () => {
        if (searchKeywords.length > 0) {
            return searchKeywords.map((item, index) => (
                <Link
                    to={config.routes.search}
                    key={index}
                    className={cx('keyword-link')}
                    onClick={handleHideResult}
                >
                    <Button
                        className={cx('keyword-item')}
                        leftIcon={<SearchIcon width="15" height="15" />}
                        style={{
                            width: '100%',
                            justifyContent: 'start',
                        }}
                    >
                        {item}
                    </Button>
                </Link>
            ));
        }
    };

    const handleSearch = useCallback(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            setSearchKeywords([]);
            return;
        }

        const fetchAPI = async () => {
            setLoading(true);

            const searchUsers = await userService.search(debouncedValue);
            const keywords = await keywordService.search(debouncedValue);

            const searchKeywords = [
                ...keywords.map((keyword) => keyword.title),
                ...searchUsers.map((user) => user.full_name),
            ];

            setLoading(false);
            setSearchKeywords(searchKeywords.slice(0, 8));
            setSearchResult(searchUsers.slice(0, 5));
        };

        fetchAPI();
    }, [debouncedValue]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const handleClear = () => {
        setSearchValue('');
        setSearchKeywords([]);
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        // Tippy.js
        // Using a wrapper <div> or <span> tag around the reference element
        // solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={
                    showResult &&
                    (searchResult.length > 0 || searchKeywords.length > 0)
                }
                interactive
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper>
                            <ul className={cx('keyword-list')}>
                                {renderSearchKeywords()}
                            </ul>

                            <h4 className={cx('search-title')}>Accounts</h4>

                            <ul className={cx('account-list')}>
                                {searchResult.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={handleHideResult}
                                    >
                                        <AccountItem data={item} />
                                    </li>
                                ))}
                            </ul>

                            {debouncedValue && (
                                <p className={cx('search-footer')}>
                                    View all results for {debouncedValue}
                                </p>
                            )}
                        </PopperWrapper>
                    </div>
                )}
            >
                <form className={cx('search')} onSubmit={handleSubmit}>
                    <input
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        type="text"
                        value={searchValue}
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear', 'icon-wrapper')}
                            onClick={handleClear}
                        >
                            <DeleteIcon width="16" height="16" />
                        </button>
                    )}

                    {loading && (
                        <button className={cx('loading', 'icon-wrapper')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}

                    <button
                        type="submit"
                        className={cx('search-btn', 'icon-wrapper')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <SearchIcon width="24" height="24" />
                    </button>
                </form>
            </HeadlessTippy>
        </div>
    );
}
