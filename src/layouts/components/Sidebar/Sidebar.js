import React from 'react';
import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';

export default function Sidebar() {
    const cx = classnames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>Sidebar</div>
        </div>
    );
}
