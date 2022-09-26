import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import classnames from 'classnames/bind';
import Image from '~/components/Image';
import { CheckedIcon } from '~/components/Icons';

import { useDispatch } from 'react-redux';
import appSlice from '~/redux/slices/appSlice';

const cx = classnames.bind(styles);

export default function UserItem({ user, showUser }) {
    const dispatch = useDispatch();

    const handleHover = (e) => {
        if (showUser) {
            const rect = e.target.getBoundingClientRect();
            dispatch(appSlice.actions.setSelectedUserID(user._id));
            dispatch(appSlice.actions.setMousePosition(rect));
        }
    };

    const handleLeave = (e) => {
        if (showUser) {
            dispatch(appSlice.actions.setSelectedUserID(null));
        }
    };

    return (
        <Link
            to={`/@${user.username}`}
            replace
            className={cx('user-item')}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <Image
                className={cx('avatar')}
                alt={user.full_name}
                src={user.avatar}
            />

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {user.username}

                    {user.tick && (
                        <CheckedIcon
                            className={cx('check')}
                            width="1.4rem"
                            height="1.4rem"
                        />
                    )}
                </h4>
                <p className={cx('description')}>{user.full_name}</p>
            </div>
        </Link>
    );
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
};
