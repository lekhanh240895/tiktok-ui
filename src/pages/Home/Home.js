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
                    <VideoItem src="https://v16-webapp.tiktok.com/1d1429fac37966393dbefb40a2765d0b/62e87f27/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3b1cabf1f1f6408182ebe7a484769c1a/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=810&bt=405&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8Z~EoKwe2NXthml7Gb&mime_type=video_mp4&qs=0&rc=NGU1aTs7ZWU2ODNoOGY7OEBpMzllOjg6ZmxrZTMzZjgzM0BiYjBeXmI2NjIxYzYyMTMzYSNxc28wcjQwZ2ZgLS1kL2Nzcw%3D%3D&l=2022080119335601024502503220522B16" />
                </li>

                <li>
                    <VideoItem src="https://v16-webapp.tiktok.com/a89819c17f63131ea7ba0f82f43ec614/62e8802c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/d8e9be42306344408eae334ac4917186/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=970&bt=485&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZFyoKwe2NC2Qml7Gb&mime_type=video_mp4&qs=0&rc=aWg1NGhlNzY5NDVmOTQ1aEBpMzdsaWg6Zmd4ZTMzZjgzM0AxLTI1MS0uNjIxNjUtYzM1YSM2MzRwcjQwMGZgLS1kL2Nzcw%3D%3D&l=20220801193814010245244165235345D3" />
                </li>

                <li>
                    <VideoItem src="https://v16-webapp.tiktok.com/1452b9769726d4e888661f8cf265df57/62e8802f/video/tos/useast2a/tos-useast2a-pve-0037-aiso/91a422c19e7a4bc8b6008ebff53ac68f/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1064&bt=532&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZFyoKwe2NC2Qml7Gb&mime_type=video_mp4&qs=0&rc=NzxkNzQ0ZzhpPGRkPDk2NEBpajlzcDc6ZnBwZTMzZjgzM0AxNi8wLi9eNl4xNF8xYWM2YSMyaDRrcjRfNWdgLS1kL2Nzcw%3D%3D&l=20220801193814010245244165235345D3" />
                </li>
            </ul>
        </div>
    );
}
