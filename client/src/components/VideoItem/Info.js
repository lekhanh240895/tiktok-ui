import { CheckedIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';
import styles from './Video.module.scss';
import Image from '../Image';
import VideoTitle from '../VideoTitle';
import { formatDate } from '~/services/formatDate';

const cx = classnames.bind(styles);

export default function Info({ video, time }) {
    return (
        <div className={cx('info')}>
            <div className={cx('header')}>
                <Link to={`/@${video.user?.username}`}>
                    <Image
                        className={cx('avatar')}
                        src={video.user?.avatar}
                        alt="avatar"
                    />
                </Link>

                <Link
                    to={`/@${video.user?.username}`}
                    className={cx('style-author')}
                >
                    <h3 className={cx('username')}>
                        {video.user?.username}
                        {video.user?.tick && (
                            <CheckedIcon
                                width="1.4rem"
                                height="1.4rem"
                                style={{ marginLeft: '3px' }}
                            />
                        )}
                    </h3>

                    <h4 className={cx('name')}>{video.user?.full_name}</h4>
                    {time && (
                        <span className={cx('time')}>
                            <span className={cx('separate')}></span>
                            <span>{formatDate(video.createdAt)}</span>
                        </span>
                    )}
                </Link>
            </div>

            <p className={cx('video-title')}>
                <VideoTitle title={video.title} />
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
