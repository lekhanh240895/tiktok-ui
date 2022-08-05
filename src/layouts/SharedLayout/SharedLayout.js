import PropTypes from 'prop-types';
import React from 'react';
import Sidebar from '../components/Sidebar/index';
import styles from './SharedLayout.module.scss';
import classnames from 'classnames/bind';
import HeaderV2 from '../components/Header2';

export default function SharedLayout({ children }) {
    const cx = classnames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <HeaderV2 />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar width={'240px'} />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

SharedLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
