import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './UserList.module.scss';
import { UserItem } from './index';
import { useState } from 'react';

const cx = classnames.bind(styles);

export default function UserList({ title, users, text, showUser }) {
    const [isMore, setIsMore] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>

            <ul className={cx('user-list')}>
                {(isMore
                    ? users
                    : title === 'Suggested accounts'
                    ? users.slice(0, 2)
                    : users.slice(0, 5)
                ).map((user) => (
                    <UserItem key={user._id} user={user} showUser={showUser} />
                ))}
            </ul>

            {!isMore ? (
                <p
                    className={cx('more-btn')}
                    onClick={() => {
                        setIsMore(true);
                    }}
                >
                    {text}
                </p>
            ) : (
                <p
                    className={cx('more-btn')}
                    onClick={() => {
                        setIsMore(false);
                    }}
                >
                    See less
                </p>
            )}
        </div>
    );
}

UserList.propTypes = {
    title: PropTypes.string,
    users: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
};
