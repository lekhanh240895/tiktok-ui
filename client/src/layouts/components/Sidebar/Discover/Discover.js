import { memo } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Discover.module.scss';
import { MusicIcon, TagIcon } from '~/components/Icons';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

function Discover() {
    const { tags, musics } = useSelector(appSelector);

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

    const keywords = [
        ...tags.map((tag) => {
            return {
                type: 'tag',
                name: tag,
            };
        }),
        ...musics.map((music) => {
            return {
                type: 'music',
                name: music,
            };
        }),
    ];

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Discover</h4>

            <ul className={cx('keyword-list')}>
                {keywords.map((keyword, index) => {
                    return (
                        <Link
                            to={`/${keyword.type}/${keyword.name}`}
                            replace
                            key={index}
                            className={cx('keyword-item')}
                        >
                            <span className={cx('icon-wrapper')}>
                                {typeKeyword(keyword.type)}
                            </span>

                            <p className={cx('keyword-text')}>{keyword.name}</p>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

export default memo(Discover);
