import classnames from 'classnames/bind';
import React from 'react';
import Footer from '~/components/Footer';
import Header from '../components/Header';
import styles from './HeaderFooterLayout.module.scss';

const cx = classnames.bind(styles);

export default function HeaderFooterLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header innerWidth="var(--shared-layout-width)" />

            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}
