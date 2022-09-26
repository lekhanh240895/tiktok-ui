import { CheckedIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';
import styles from './Video.module.scss';
import Image from '../Image';

const cx = classnames.bind(styles);

export default function Info({ video, user }) {
    const tags = video.title.trim().slice(video.title.indexOf('#')).split(' ');

    return (
        <div className={cx('info')}>
            <div className={cx('header')}>
                <Link to={`/@${user?.username}`}>
                    <Image
                        className={cx('avatar')}
                        src={user?.avatar}
                        alt="avatar"
                    />
                </Link>

                <Link to={`/@${user?.username}`} className={cx('styleAuthor')}>
                    <h3 className={cx('username')}>
                        {user?.username}
                        {user?.tick && (
                            <CheckedIcon
                                width="1.4rem"
                                height="1.4rem"
                                style={{ marginLeft: '3px' }}
                            />
                        )}
                    </h3>

                    <h4 className={cx('name')}>{user?.full_name}</h4>
                </Link>
            </div>

            <p className={cx('video-title')}>
                {video.title.slice(0, video.title.indexOf('#'))}
                {/* Keywords */}

                {tags.map((tag, index) => (
                    <Link to={`/tag/${tag.replace('#', '')}`} key={index}>
                        <span key={index} className={cx('video-tag')}>
                            {tag}
                        </span>
                    </Link>
                ))}
            </p>

            <h4 className={cx('video-music')}>
                <Button
                    leftIcon={<MusicIcon width="1.6rem" height="1.6rem" />}
                    text={true}
                    to={`/music/${video.music}`}
                >
                    {video.music}
                </Button>
            </h4>
        </div>
    );
}
