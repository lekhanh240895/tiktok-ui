import styles from './Discover.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as keywordService from '~/services/keywordService';
import { Link } from 'react-router-dom';
import { MusicIcon, TagIcon } from '~/components/Icons';
import config from '~/config';

const cx = classnames.bind(styles);

export default function Discover() {
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        keywordService.get().then((res) => setKeywords(res.slice(0, 15)));
    }, []);

    const typeKeyword = (type) => {
        switch (type) {
            case 'tag':
                return <TagIcon width="16" height="16" />;
            case 'music':
                return <MusicIcon width="16" height="16" />;
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
                            to={config.routes[keyword.type]}
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
