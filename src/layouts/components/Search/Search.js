import { faSpinner, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '~/config/routes';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '../AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks/useDebounce';
import * as searchService from '~/services/searchService';
import Button from '~/components/Button';

const cx = classnames.bind(styles);

const keywords = [
    'korean girls',
    'korean songs',
    'korean studys',
    'hoa',
    'hoa đẹp',
    'hoa hướng dương',
    'hoavinhh',
    'le bong',
    'le khanh',
];

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);

    const renderSearchKeywords = () => {
        const searchKeywords = [
            ...keywords,
            ...searchResult.map((item) => item.full_name),
        ];

        return searchKeywords
            .filter((keyword) => {
                return keyword
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase());
            })
            .map((item, index) => (
                <Link
                    to={routes.search}
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
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchAPI = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);

            setLoading(false);
            setSearchResult(result);
        };

        fetchAPI();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
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
    return (
        // Tippy.js
        // Using a wrapper <div> or <span> tag around the reference element
        // solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
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

                            <p className={cx('search-footer')}>
                                View all results for {debouncedValue}
                            </p>
                        </PopperWrapper>
                    </div>
                )}
            >
                <form className={cx('search')}>
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
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    )}

                    {loading && (
                        <button className={cx('loading')}>
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
