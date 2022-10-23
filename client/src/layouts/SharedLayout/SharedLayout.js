import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar/index';
import styles from './SharedLayout.module.scss';
import classnames from 'classnames/bind';
import UserProfile from '../components/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, usersSelector } from '~/redux/selectors';
import appSlice from '~/redux/slices/appSlice';
import Header from '../components/Header';

const cx = classnames.bind(styles);

export default function SharedLayout({ children }) {
    const { selectedUserID, mousePosition } = useSelector(appSelector);
    const { users } = useSelector(usersSelector);
    const dispatch = useDispatch();

    const tooltipRef = useRef(null);

    const selectedUser = users.find((user) => user._id === selectedUserID);

    const handleHover = () =>
        dispatch(appSlice.actions.setSelectedUserID(selectedUserID));

    const handleLeave = (e) => {
        dispatch(appSlice.actions.setSelectedUserID(null));
    };

    useEffect(() => {
        if (selectedUserID) {
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
    }, [mousePosition, selectedUserID]);

    return (
        <div className={cx('wrapper')}>
            <Header innerWidth="var(--shared-layout-width)" />

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
                                <UserProfile user={selectedUser} />
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
