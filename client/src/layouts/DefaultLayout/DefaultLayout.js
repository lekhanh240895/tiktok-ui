import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import styles from './DefaultLayout.module.scss';
import classnames from 'classnames/bind';
import UserProfile from '../components/UserProfile';
import appSlice from '~/redux/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, usersSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

export default function DefaultLayout({ children }) {
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
            <Header />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <div className={cx('sidebar-nav-mask')} />

                    <div className={cx('sidenav-container')}>
                        <Sidebar width={'340px'} />

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

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
