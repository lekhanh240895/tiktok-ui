import React from 'react';
import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import config from '~/config';

const cx = classnames.bind(styles);

export default function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For You"
                    icon={<HomeIcon />}
                    activeIcon={<HomeIcon />}
                    to={config.routes.home}
                />
                <MenuItem
                    title="Following"
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                    to={config.routes.following}
                />
                <MenuItem
                    title="LIVE"
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                    to={config.routes.live}
                />
            </Menu>
            <div className={cx('suggest')}></div>
            <div className={cx('following')}></div>
            <div className={cx('discover')}></div>
            <div className={cx('footer')}></div>
        </aside>
    );
}
