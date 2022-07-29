import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './UserList.module.scss';
import { UserItem } from './index';

const cx = classnames.bind(styles);

export default function UserList({ title, users, text, onMore }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>

            <ul className={cx('user-list')}>
                {users.map((user) => (
                    <UserItem key={user.id} data={user} />
                ))}
            </ul>

            <p className={cx('more-btn')} onClick={() => onMore(title)}>
                {text}
            </p>
        </div>
    );
}

UserList.propTypes = {
    title: PropTypes.string,
    users: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    onMore: PropTypes.func.isRequired,
};
