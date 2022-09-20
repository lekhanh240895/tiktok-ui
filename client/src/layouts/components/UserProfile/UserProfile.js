import PropTypes from 'prop-types';
import styles from './UserProfile.module.scss';
import classnames from 'classnames/bind';

import Button from '~/components/Button';
import { CheckedIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { useAppContext } from '~/store/AppContext';
import * as actions from '~/store/actions';
import { useEffect, useState } from 'react';

const cx = classnames.bind(styles);

export const UserProfile = ({ data }) => {
    const [{ currentUser }, dispatch] = useAppContext();

    const [isFollow, setIsFollow] = useState(
        currentUser.followingIDs.includes(data.id),
    );

    useEffect(() => {
        if (currentUser.followingIDs.includes(data.id)) {
            setIsFollow(true);
        } else {
            setIsFollow(false);
        }
    }, [currentUser, data]);

    const handleFollow = () => {
        dispatch(actions.followUser(data.id));
    };

    const handleUnFollow = () => {
        dispatch(actions.unFollowUser(data.id));
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
