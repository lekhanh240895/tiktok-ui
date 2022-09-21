import PropTypes from 'prop-types';
import styles from './UserProfile.module.scss';
import classnames from 'classnames/bind';

import Button from '~/components/Button';
import { CheckedIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from '~/redux/selectors';
import { updateUser } from '~/redux/slices/usersSlice';

const cx = classnames.bind(styles);

export const UserProfile = ({ data }) => {
    const { currentUser } = useSelector(appSelector);
    const [isFollow, setIsFollow] = useState(
        currentUser?.followingIDs.includes(data.id),
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser?.followingIDs.includes(data.id)) {
            setIsFollow(true);
        } else {
            setIsFollow(false);
        }
    }, [currentUser, data]);

    const handleFollow = () => {
        dispatch(updateUser(data.id));
    };

    const handleUnFollow = () => {
        dispatch(updateUser(data.id));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={`/@${data.nickname}`} replace>
                    <Image
                        src={data.avatar}
                        alt={data.full_name}
                        className={cx('avatar')}
                    />
                </Link>

                {!isFollow ? (
                    <Button
                        primary
                        className={cx('follow-btn')}
                        onClick={handleFollow}
                    >
                        Follow
                    </Button>
                ) : (
                    <Button
                        secondary
                        className={cx('follow-btn')}
                        onClick={handleUnFollow}
                    >
                        Follow
                    </Button>
                )}
            </div>

            <div className={cx('info')}>
                <Link to={`/@${data.nickname}`} replace>
                    <h4 className={cx('name')}>
                        {data.full_name}
                        {data.tick && (
                            <CheckedIcon
                                width="1.4rem"
                                height="1.4rem"
                                style={{ marginLeft: '8px' }}
                            />
                        )}
                    </h4>
                </Link>

                <Link to={`/@${data.nickname}`} replace>
                    <p className={cx('desc')}>{data.nickname}</p>
                </Link>

                <p className={cx('user-stat')}>
                    <span>
                        <span className={cx('stat-number')}>9.6M</span>
                        <span className={cx('stat-desc')}> Followers</span>
                    </span>
                    <span>
                        <span className={cx('stat-number')}>22.7M</span>
                        <span className={cx('stat-desc')}> Likes</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    data: PropTypes.object.isRequired,
};
export default UserProfile;
