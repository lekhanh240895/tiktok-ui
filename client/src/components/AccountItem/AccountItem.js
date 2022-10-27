import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import { CheckedIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function AccountItem({ user }) {
    return (
        <Link to={`/@${user.username}`} replace className={cx('wrapper')}>
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
                <p className={cx('description')}>
                    {user.full_name}
                    <span className={cx('seperate')}>-</span>
                    <span>
                        <span className={cx('followerNumber')}>
                            {user.followers.length}
                        </span>
                        Followers
                    </span>
                </p>
                <p className={cx('bio')}>{user.bio}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    user: PropTypes.object,
};
