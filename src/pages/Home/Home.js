import React from 'react';
import styles from './Home.module.scss';
import classnames from 'classnames/bind';

import VideoItem from '~/components/VideoItem';
const cx = classnames.bind(styles);

export default function Home() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('video-list')}>
                <li>
                    <VideoItem src="../../assets/videos/video1.mp4" />
                </li>

                <li>
                    <VideoItem src="~/assets/videos/video2.mp4" />
                </li>
            </ul>
        </div>
    );
}

Home.propTypes = {};
