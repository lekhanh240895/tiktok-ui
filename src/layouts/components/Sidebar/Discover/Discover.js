import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as keywordService from '~/services/keywordService';
import styles from './Discover.module.scss';
import { MusicIcon, TagIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function Discover() {
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        keywordService.get().then((res) => setKeywords(res.slice(0, 15)));
    }, []);

    const typeKeyword = (type) => {
        switch (type) {
            case 'tag':
                return <TagIcon width="1.6rem" height="1.6rem" />;
            case 'music':
                return <MusicIcon width="1.6rem" height="1.6rem" />;
            default:
                return;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Discover</h4>

            <ul className={cx('keyword-list')}>
                {keywords.map((keyword, index) => {
                    return (
                        <Link
                            to={`/${keyword.type}/${keyword.title}`}
                            replace
                            key={index}
                            className={cx('keyword-item')}
                        >
                            <span className={cx('icon-wrapper')}>
                                {typeKeyword(keyword.type)}
                            </span>

                            <p className={cx('keyword-text')}>
                                {keyword.title}
                            </p>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}
