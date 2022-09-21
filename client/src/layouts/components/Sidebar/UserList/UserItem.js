import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import classnames from 'classnames/bind';
import Image from '~/components/Image';
import { CheckedIcon } from '~/components/Icons';

import { useDispatch } from 'react-redux';
import appSlice from '~/redux/slices/appSlice';

const cx = classnames.bind(styles);

export default function UserItem({ data, showUser }) {
    const dispatch = useDispatch();

    const handleHover = (e) => {
        if (showUser) {
            const rect = e.target.getBoundingClientRect();
            dispatch(appSlice.actions.setSelectedUserId(data.id));
            dispatch(appSlice.actions.setMousePosition(rect));
        }
    };

    const handleLeave = (e) => {
        if (showUser) {
            dispatch(appSlice.actions.setSelectedUserId(null));
        }
    };

    return (
        <Link
            to={`/@${data.nickname}`}
            replace
            className={cx('user-item')}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <Image
                className={cx('avatar')}
                alt={data.full_name}
                src={data.avatar}
            />

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.nickname}

                    {data.tick && (
                        <CheckedIcon
                            className={cx('check')}
                            width="1.4rem"
                            height="1.4rem"
                        />
                    )}
                </h4>
                <p className={cx('description')}>{data.full_name}</p>
            </div>
        </Link>
    );
}

UserItem.propTypes = {
    data: PropTypes.object.isRequired,
};
