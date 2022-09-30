import classnames from 'classnames/bind';
import React from 'react';
import Footer from '~/components/Footer';
import HeaderV2 from '../components/Header2';
import styles from './HeaderFooterLayout.module.scss';

const cx = classnames.bind(styles);

export default function HeaderFooterLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderV2 />

            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}
