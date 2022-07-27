import React from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import styles from './DefaultLayout.module.scss';
import classnames from 'classnames/bind';

export default function DefaultLayout({ children }) {
    const cx = classnames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <Sidebar />

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
