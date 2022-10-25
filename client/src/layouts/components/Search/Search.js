import HeadlessTippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '../AccountItem';
import { TimesIconCircle, SearchIcon, SpinnerIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks/useDebounce';
import * as userService from '~/services/userService';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const { tags, musics } = useSelector(appSelector);

    const navigate = useNavigate();
    const debouncedValue = useDebounce(searchValue, 500);

    const renderSearchKeywords = () => {
        if (searchKeywords.length > 0) {
            return searchKeywords.map((item, index) => (
                <Link
                    to={`/search?q=${item}`}
                    key={index}
                    className={cx('keyword-link')}
                    onClick={handleHideResult}
                >
                    <Button
                        className={cx('keyword-item')}
                        leftIcon={<SearchIcon width="1.5rem" height="1.5rem" />}
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

            const searchUsers = await userService.searchUser(debouncedValue);

            const searchKeywords = [
                ...tags.map((tag) => tag),
                ...musics.map((music) => music),
                ...searchUsers.map((user) => user.full_name),
            ];

            const filteredSearchKeywords = searchKeywords.filter((keyword) =>
                keyword.toLowerCase().includes(debouncedValue.toLowerCase()),
            );

            setLoading(false);
            setSearchKeywords(filteredSearchKeywords.slice(0, 8));
            setSearchResult(searchUsers.slice(0, 5));
        };

        fetchAPI();
    }, [debouncedValue, tags, musics]);

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
        setShowResult(false);
        navigate(`/search?q=${searchValue}`, {
            replace: true,
        });
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
                                {searchResult.map((user) => (
                                    <li
                                        key={user._id}
                                        onClick={handleHideResult}
                                    >
                                        <AccountItem user={user} />
                                    </li>
                                ))}
                            </ul>

                            {debouncedValue && (
                                <p
                                    className={cx('search-footer')}
                                    onClick={() => {
                                        navigate(`/search?q=${searchValue}`, {
                                            replace: true,
                                        });
                                        handleHideResult();
                                    }}
                                >
                                    View all results for {debouncedValue}
                                </p>
                            )}
                        </PopperWrapper>
                    </div>
                )}
            >
                <form className={cx('search')} onSubmit={handleSubmit}>
                    {/* <form className={cx('search')} method="GET" action="/search"> */}
                    <input
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        type="text"
                        value={searchValue}
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        name="q"
                    />

                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear', 'icon-wrapper')}
                            onClick={handleClear}
                            type="button"
                        >
                            <TimesIconCircle width="1.6rem" height="1.6rem" />
                        </button>
                    )}

                    {loading && (
                        <button
                            className={cx('loading', 'icon-wrapper')}
                            type="button"
                        >
                            <SpinnerIcon width="1.6rem" height="1.6rem" />
                        </button>
                    )}

                    <button
                        type="submit"
                        className={cx('search-btn', 'icon-wrapper')}
                        onMouseDown={(e) => e.preventDefault()}
                        disabled={!searchValue}
                    >
                        <SearchIcon width="2.4rem" height="2.4rem" />
                    </button>
                </form>
            </HeadlessTippy>
        </div>
    );
}
