import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar/index';
import styles from './SharedLayout.module.scss';
import classnames from 'classnames/bind';
import HeaderV2 from '../components/Header2';
import UserProfile from '../components/UserProfile';
import { useAppContext } from '~/store/AppContext';
import * as actions from '~/store/actions';

const cx = classnames.bind(styles);

export default function SharedLayout({ children }) {
    const [{ users, selectedUserId, mousePosition }, dispatch] =
        useAppContext();

    const tooltipRef = useRef(null);

    const selectedUser = users.find((user) => user.id === selectedUserId);

    const handleHover = () =>
        dispatch(actions.setSelectedUserId(selectedUserId));

    const handleLeave = (e) => {
        dispatch(actions.setSelectedUserId(null));
    };

    useEffect(() => {
        if (selectedUserId) {
            if (window.innerWidth > 1024) {
                tooltipRef.current.style.top =
                    mousePosition.top + window.scrollY + 'px';
                tooltipRef.current.style.left = '-10px';
                tooltipRef.current.style.display = 'block';
            } else {
                tooltipRef.current.style.top =
                    mousePosition.top - 60 + window.scrollY + 'px';
                tooltipRef.current.style.left = 56 + 'px';
                tooltipRef.current.style.display = 'block';
            }
        }
    }, [mousePosition, selectedUserId]);

    return (
        <div className={cx('wrapper')}>
            <HeaderV2 />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <div className={cx('sidebar-nav-mask')} />

                    <div className={cx('sidenav-container')}>
                        <Sidebar width={'240px'} />

                        {selectedUser && (
                            <div
                                className={cx('user-profile-container')}
                                ref={tooltipRef}
                                onMouseEnter={handleHover}
                                onMouseLeave={handleLeave}
                            >
                                <UserProfile data={selectedUser} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

SharedLayout.propTypes = {
    children: PropTypes.node.isRequired,
};