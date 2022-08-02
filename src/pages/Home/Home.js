import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import classnames from 'classnames/bind';

import Video from '~/components/Video';
import videos from '~/assets/videos';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useAppContext } from '~/contexts/AppContext';

const cx = classnames.bind(styles);

const dbVideos = [
    {
        id: 1,
        userId: 8,
        title: 'Mọi người có đồng ý không? Cãi sao được mà cãi haha #anhsedoi #emhatainghe #phaohong #remix #nhachayminmin #xuhuong',
        src: videos.video5,
        like: 1412,
        share: 123,
        comment: 121,
        music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
    },
    {
        id: 2,
        userId: 8,
        title: 'Nghe nó cứ đã và sang sao á. Không thể nào sai được #lacchonhongtran #itnhungdailau #khongbang #remix #nhachayminmin',
        src: videos.video6,
        like: 1234115,
        share: 1123,
        comment: 1123,
        music: 'Thuyền Quyền x AM Ri mic - nhac cua bet ♪',
    },
    {
        id: 3,
        userId: 1,
        title: 'Sao đến tận bây giờ tôi mới nghe bài này cơ chứ. Quá hay #themtungphutgiay #kayn #umie #nhachayminmin',
        src: videos.video7,
        like: 112123123,
        share: 113,
        comment: 1134,
        music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
    },
    {
        id: 4,
        userId: 6,
        title: 'Mọi người có đồng ý không? Cãi sao được mà cãi haha #anhsedoi #emhatainghe #phaohong #remix #nhachayminmin #xuhuong',
        src: videos.video4,
        like: 112123123,
        share: 113,
        comment: 1134,
        music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
    },
    {
        id: 5,
        userId: 4,
        title: 'Không cãi được. Đoạn gẩy guitar cuốn bay bản gốc liền luôn #thuyenquyen #dieukien #remix #nhachayminmin #xuhuong',
        src: videos.video3,
        like: 1123,
        share: 113,
        comment: 1134,
        music: 'Thuyền Quyền x AM Ri mic - nhac cua bet ♪',
    },
    {
        id: 6,
        userId: 3,
        title: 'Chối cãi sao được nữa. Quá đúng luôn. Trùm cuối đỉnh thật.',
        src: videos.video1,
        like: 4121,
        share: 13,
        comment: 1134,
        music: 'nhạc nền - Gia Huy Singer 92',
    },
    {
        id: 7,
        userId: 7,
        title: 'Chính xác là 11 bài. Quá đình không ai sánh bằng #nal #nhachayminmin #dangdo #roitoiluon #ngoinhavadongrom #xuhuong        ',
        src: videos.video2,
        like: 112123,
        share: 13,
        comment: 11,
        music: 'nhạc nền - 🍉Min Min🍉',
    },
];

export default function Home() {
    const [settings, setSettings] = useState({});
    const { users } = useAppContext();

    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem('userSettings'));
        setSettings(settings);
    }, []);

    const setConfig = (key, value) => {
        settings[key] = value;
        localStorage.setItem('userSettings', JSON.stringify(settings));
    };

    const handleMuteVolume = () => {
        setSettings({
            ...settings,
            isMuted: !settings.isMuted,
        });
        setConfig('isMuted', !settings.isMuted);
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);

        setSettings({
            ...settings,
            volume: newVolume,
            isMuted: newVolume > 0 ? false : true,
        });

        setConfig('volume', newVolume);
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('video-list')}>
                {dbVideos.map((video) => {
                    const user = users.find(
                        (user) => user?.id === video.userId,
                    );
                    return (
                        <li key={video.id} className={cx('video-item')}>
                            <Link to={`/@${user?.nickname}`}>
                                <Image
                                    className={cx('avatar')}
                                    src={user?.avatar}
                                    alt="avatar"
                                />
                            </Link>

                            <Video
                                data={video}
                                user={user}
                                isMuted={settings.isMuted || false}
                                volume={settings.volume || 1}
                                onMutedVolume={handleMuteVolume}
                                onVolumeChange={handleVolumeChange}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
